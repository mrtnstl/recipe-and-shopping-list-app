import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173"
};
app.use(cors());

const shoppingListsModel = [
    { id: 1, user_id: 1, product_name: "kenyér", product_quantity: 1, product_unit: "kg", estimated_price_per_unit: 400, currency: "HUF" },
    { id: 2, user_id: 1, product_name: "margarin", product_quantity: 1, product_unit: "dkg", estimated_price_per_unit: 670, currency: "HUF" },
    { id: 3, user_id: 1, product_name: "paprika", product_quantity: 3, product_unit: "piece", estimated_price_per_unit: 70, currency: "HUF" },
    { id: 4, user_id: 1, product_name: "tej", product_quantity: 1, product_unit: "liter", estimated_price_per_unit: 352, currency: "HUF" },
]

const users = [
    { id: "1", name: "john", password: "John123", isAdmin: true },
    { id: "2", name: "jane", password: "Jane123", isAdmin: false },
];
const verify = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Authentication required!" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "my-very-secret-key", (err, payload) => {
        if (err) return res.status(403).json({ message: "Invalid token!" });
        req.user = payload;
        console.log("Verify MW", req.user.id)
        return next();
    })
}
let refreshTokens = [];
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "my-very-secret-key", { expiresIn: "30s" });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "my-very-secret-refresh-key");
};
app.post("/api/refresh", (req, res) => {
    // take token refresh token from user
    const refreshToken = req.body.token;
    console.log("Refresh request", refreshToken)
    // send error if no token or invalid
    if (!refreshToken) return res.status(401).json({ message: "You aren't authenticated!" });
    console.log("Refresh request after token existence check, before token array check")
    console.log(refreshTokens)
    if (refreshTokens.includes(refreshToken)) console.log("Refresh req, a tömb tartalmazza a refreshTokent")
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: "Invalid refresh token!" });
    console.log("Refresh request after token array check")
    // if ok create new access token, refresh token and send to user
    jwt.verify(refreshToken, "my-very-secret-refresh-key", (err, payload) => {
        if (err) console.log(err);
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);
        refreshTokens.push(newRefreshToken);
        console.log(refreshTokens)
        console.log("Refresh request before return", newAccessToken, newRefreshToken)
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    });
});
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => {
        return u.name === username && u.password === password ? u : null;
    });
    if (user) {

        // generate access token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        console.log(refreshTokens)
        return res.json({ username: user.name, isAdmin: user.isAdmin, accessToken, refreshToken });
    };
    return res.status(400).json({ message: "Invalid login credentials!" });
});
app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    return res.status(200).json({ message: "Logged out!" });
});
app.get("/api/shopping-list/:userId", verify, (req, res) => {
    const userId = req.params.userId;
    const shoppingList = shoppingListsModel.map(item => { if (item.user_id === parseInt(userId)) return item });

    return res.status(200).json(shoppingList);
})
app.delete("/api/users/:userId", verify, (req, res) => {
    if (typeof req.user.id === "undefined") console.log("deleteUserMW user id is undefined:", req.user.id, req.user)
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        return res.status(200).json({ message: "User has been deleted!" });
    };
    return res.status(403).json({ message: "Insufficient rights to delete this user!" });
});
app.listen(5000, () => { console.log("Backend is running") });
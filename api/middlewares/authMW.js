import jwt from "jsonwebtoken";
// TODO: pass objectRepository
export const verify = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Authentication required!" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(401).json({ message: "Invalid token!" }); // WARNING: changed status code to 401, reflect this inside frontend fetch script
        req.user = payload;
        console.log("Verify MW", req.user.id)
        return next();
    })
}
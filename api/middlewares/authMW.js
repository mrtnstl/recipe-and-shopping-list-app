import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Authentication required!" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "my-very-secret-key", (err, payload) => { // TODO: get real secret from env 
        if (err) return res.status(403).json({ message: "Invalid token!" });
        req.user = payload;
        console.log("Verify MW", req.user.id)
        return next();
    })
}
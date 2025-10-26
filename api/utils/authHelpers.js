import jwt from "jsonwebtoken";

function generateAccessToken(user) {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
};
function generateRefreshToken(user) {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const authHelpers = {
    generateAccessToken, generateRefreshToken
};
export default authHelpers;
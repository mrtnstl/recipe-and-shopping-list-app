import jwt from "jsonwebtoken";

function generateAccessToken(user) {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "my-very-secret-key", { expiresIn: "30s" });
};
function generateRefreshToken(user) {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "my-very-secret-refresh-key");
};

const authHelpers = {
    generateAccessToken, generateRefreshToken
};
export default authHelpers;
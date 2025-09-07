//import services here
import authService from "../services/authService.js";
import authHelpers from "../utils/authHelpers.js";
import MockCache from "../services/cache/mockCacheStore.js";

// USER SERVICE
import Users from "../repositories/userRepository.js";

const authController = {
    login: async (req, res, next) => {
        const { username, password } = req.body;

        const user = await Users.findOne(username, password);
        console.log("RESU", user)
        if (!user) return res.status(400).json({ message: "Invalid login credentials!" });

        const accessToken = authHelpers.generateAccessToken(user);
        const refreshToken = authHelpers.generateRefreshToken(user);
        MockCache.refreshTokens.push(refreshToken);

        return res.json({ username: user.name, isAdmin: user.isAdmin, accessToken, refreshToken });

    },
    logout: (req, res, next) => {
        const refreshToken = req.body.token;
        MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken);
        return res.status(200).json({ message: "Logged out!" });
    },
    refresh: async (req, res, next) => {
        const refreshToken = req.body.token;
        console.log("Refresh request", refreshToken)

        if (!refreshToken) return res.status(401).json({ message: "You aren't authenticated!" });

        if (MockCache.refreshTokens.includes(refreshToken)) console.log("Refresh req, a tömb tartalmazza a refreshTokent");
        if (!MockCache.refreshTokens.includes(refreshToken)) return res.status(403).json({ message: "Invalid refresh token!" });

        const { newAccessToken, newRefreshToken } = await authService.refreshExpiringRefreshToken(refreshToken);

        return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    },


}
export default authController;
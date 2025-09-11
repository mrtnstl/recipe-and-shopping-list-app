const authController = {
    login: (objectRepository) => {
        const { MockCache, authService } = objectRepository;
        return async (req, res, next) => {
            const { username, password } = req.body;
            try {
                const user = await authService.getUser(username, password);
                if (!user) return res.status(400).json({ message: "Invalid login credentials!" });

                const accessToken = await authService.getAccessToken(user);
                const refreshToken = await authService.getRefreshToken(user);
                MockCache.refreshTokens.push(refreshToken);

                return res.status(200).json({ username: user.name, isAdmin: user.isAdmin, accessToken, refreshToken });
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
    logout: (objectRepository) => {
        const { authService } = objectRepository;
        return async (req, res, next) => {
            const refreshToken = req.body.token;

            const destroyToken = await authService.destroyRefreshToken(refreshToken);
            if (!destroyToken) return res.status(400).json({ message: "Failed to log out!" });

            return res.status(200).json({ message: "Logged out!" });
        }
    },
    refresh: (objectRepository) => {
        const { MockCache, authService } = objectRepository;
        return async (req, res, next) => {
            const refreshToken = req.body.token;

            if (!refreshToken) return res.status(401).json({ message: "You aren't authenticated!" });

            if (!MockCache.refreshTokens.includes(refreshToken)) return res.status(403).json({ message: "Invalid refresh token!" });

            try {
                const { newAccessToken, newRefreshToken } = await authService.refreshExpiringRefreshToken(refreshToken);
                return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
}
export default authController;
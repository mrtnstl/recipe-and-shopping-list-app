const authController = {
    login: (objectRepository) => {
        const { Cache, authService, authSchema } = objectRepository;
        return async (req, res, next) => {
            const { userEmail, password } = req.body ?? {};
            /* TEST USER
                "userEmail": "bowsrthelizard@mail.com",
                "password": "Bowser123!"
            */

            if (typeof userEmail === "undefined" || typeof password === "undefined")
                return res.status(400).json({ message: "Bad request!" });

            const { error } = authSchema.validate({ userEmail, password });
            if (error) return res.status(422).json({ message: error.message }); // TODO: custom error for "Unprocessable Entity"

            try {
                const user = await authService.authenticateUser(objectRepository)(userEmail, password);
                if (!user) return res.status(400).json({ message: "Invalid login credentials!" });

                const accessToken = await authService.getAccessToken(objectRepository)(user);
                const refreshToken = await authService.getRefreshToken(objectRepository)(user);
                Cache.set(refreshToken); // TODO: change MockCache to Redis

                return res.status(200).json({ userEmail: user.name, isAdmin: user.isAdmin, accessToken, refreshToken });
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
    logout: (objectRepository) => {
        const { authService } = objectRepository;
        return async (req, res, next) => {
            const refreshToken = req.body.token ?? undefined;
            if (typeof refreshToken === "undefined") return res.status(400).json({ message: "Missing refresh token!" });

            const destroyToken = await authService.destroyRefreshToken(objectRepository)(refreshToken);
            if (!destroyToken) return res.status(400).json({ message: "Failed to log out!" });

            return res.status(200).json({ message: "Logged out!" });
        }
    },
    refresh: (objectRepository) => {
        const { Cache, authService } = objectRepository;
        return async (req, res, next) => {
            const refreshToken = req.body.token ?? undefined;
            if (!refreshToken) return res.status(401).json({ message: "You aren't authenticated!" });
            if (!Cache.get(refreshToken)) return res.status(403).json({ message: "Invalid refresh token!" }); // TODO: change MockCache to Redis

            try {
                const { newAccessToken, newRefreshToken } = await authService.refreshExpiringTokens(objectRepository)(refreshToken);
                return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            } catch (err) {
                const statusCode = err.statusCode || 400; // TODO: custom errors yet to be implemented
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
}
export default authController;
class authController {
    login(objectRepository) {
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
                if (!user) return res.status(401).json({ message: "Invalid login credentials!" }); // TODO: custom error Invalid Credentials

                const accessToken = await authService.getAccessToken(objectRepository)(user);
                const refreshToken = await authService.getRefreshToken(objectRepository)(user);

                Cache.set(refreshToken); // TODO: change MockCache to Redis

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "prod",
                    sameSite: process.env.NODE_ENV === "prod" ? "none" : "lax",
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });

                return res.status(200).json({ userEmail: user.name, isAdmin: user.isAdmin, accessToken });
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
    logout(objectRepository) {
        const { authService } = objectRepository;
        return async (req, res, next) => {

            const { refreshToken } = req.cookies ?? "";
            if (typeof refreshToken === "undefined") return res.status(400).json({ message: "Missing refresh token!" }); // TODO: consider 401

            const destroyToken = await authService.destroyRefreshToken(objectRepository)(refreshToken);
            if (!destroyToken) return res.status(400).json({ message: "Failed to log out!" });

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "prod",
                sameSite: process.env.NODE_ENV === "prod" ? "none" : "lax",
            });

            return res.status(204);
        }
    }
    refresh(objectRepository) {
        const { Cache, authService, jwt } = objectRepository;
        return async (req, res, next) => {

            const { refreshToken } = req.cookies;
            if (!refreshToken) return res.status(401).json({ message: "You aren't authenticated!" });

            if (!Cache.get(refreshToken)) return res.status(403).json({ message: "Invalid refresh token!" }); // TODO: change MockCache to Redis

            try {
                jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, async (err, payload) => {
                    if (err) return res.status(401).json({ message: "Invalid token!" }); // TODO: 403 error instead???
                });

                const { newAccessToken, newRefreshToken } = await authService.refreshExpiringTokens(objectRepository)(refreshToken);

                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "prod",
                    sameSite: process.env.NODE_ENV === "prod" ? "none" : "lax",
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });

                return res.status(200).json({ accessToken: newAccessToken });
            } catch (err) {
                const statusCode = err.statusCode || 400; // TODO: custom errors yet to be implemented
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
}
export default new authController();
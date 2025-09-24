const authService = {
    authenticateUser: (objectRepository) => {
        const { Users, bcrypt } = objectRepository;
        return async (userEmail, password) => {
            console.log("authService:", userEmail, password);
            const user = await Users.getUserByEmail(objectRepository)(userEmail);
            if (!user) return null;

            console.log("authService:", userEmail, password);
            const pwCheck = await bcrypt.compare(password, user.pw_hash);
            if (!pwCheck) return null;

            console.log("authService:", userEmail, password);
            return user;
        }
    },
    getAccessToken: (objectRepository) => {
        const { authHelpers } = objectRepository;
        return async (user) => {
            const accessToken = authHelpers.generateAccessToken(user);
            return accessToken;
        }
    },
    getRefreshToken: (objectRepository) => {
        const { authHelpers } = objectRepository;
        return async (user) => {
            const refreshToken = authHelpers.generateRefreshToken(user);
            return refreshToken;
        }
    },
    destroyRefreshToken: (objectRepository) => {
        const { Cache } = objectRepository;
        return async (refreshToken) => {
            Cache.destroy(refreshToken); // TODO: change MockCache to Redis
            return true;
        }
    },
    refreshExpiringTokens: (objectRepository) => {
        const { Cache, authHelpers, jwt } = objectRepository;
        return async (refreshToken) => {
            const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
            Cache.destroy(refreshToken); // TODO: change MockCache to Redis

            const newAccessToken = authHelpers.generateAccessToken(payload);
            const newRefreshToken = authHelpers.generateRefreshToken(payload);

            Cache.set(newRefreshToken); // TODO: change MockCache to Redis

            return ({ newAccessToken, newRefreshToken });
        }
    }
};

export default authService;
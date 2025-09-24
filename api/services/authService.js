const authService = {
    getUser: (objectRepository) => {
        const { Users } = objectRepository;
        return async (username, password) => {
            const user = await Users.findOne(username, password);
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
            const payload = jwt.verify(refreshToken, "my-very-secret-refresh-key");
            Cache.destroy(refreshToken); // TODO: change MockCache to Redis

            const newAccessToken = authHelpers.generateAccessToken(payload);
            const newRefreshToken = authHelpers.generateRefreshToken(payload);

            Cache.set(newRefreshToken); // TODO: change MockCache to Redis

            return ({ newAccessToken, newRefreshToken });
        }
    }
};

export default authService;
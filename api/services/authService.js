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
        const { MockCache } = objectRepository;
        return async (refreshToken) => {
            MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken); // TODO: change MockCache to Redis
            return true;
        }
    },
    refreshExpiringTokens: (objectRepository) => {
        const { MockCache, authHelpers, jwt } = objectRepository;
        return async (refreshToken) => {
            jwt.verify(refreshToken, "my-very-secret-refresh-key", (err, payload) => {
                if (err) throw new Error(err);

                MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken); // TODO: change MockCache to Redis

                const newAccessToken = authHelpers.generateAccessToken(payload);
                const newRefreshToken = authHelpers.generateRefreshToken(payload);

                MockCache.refreshTokens.push(newRefreshToken); // TODO: change MockCache to Redis

                return ({ newAccessToken, newRefreshToken });
            });
        }
    }
};

export default authService;
import jwt from "jsonwebtoken";

import MockCache from "./cache/mockCacheStore.js";
import authHelpers from "../utils/authHelpers.js";
import Users from "../repositories/userRepository.js";

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
            MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken);
            return true;
        }
    },
    refreshExpiringRefreshToken: (objectRepository) => {
        const { MockCache, authHelpers } = objectRepository;
        return async (refreshToken) => {
            jwt.verify(refreshToken, "my-very-secret-refresh-key", (err, payload) => {
                if (err) throw new Error(err);

                MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken);

                const newAccessToken = authHelpers.generateAccessToken(payload);
                const newRefreshToken = authHelpers.generateRefreshToken(payload);

                MockCache.refreshTokens.push(newRefreshToken);

                return ({ newAccessToken, newRefreshToken });
            });
        }
    }
};

export default authService;
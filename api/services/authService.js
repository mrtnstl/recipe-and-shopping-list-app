import jwt from "jsonwebtoken";

import MockCache from "./cache/mockCacheStore.js";
import authHelpers from "../utils/authHelpers.js";
import Users from "../repositories/userRepository.js";

const authService = {
    getUser: async (username, password) => {
        const user = await Users.findOne(username, password);
        return user;
    },
    getAccessToken: async (user) => {
        const accessToken = authHelpers.generateAccessToken(user);
        return accessToken;
    },
    getRefreshToken: async (user) => {
        const refreshToken = authHelpers.generateRefreshToken(user);
        return refreshToken;
    },
    destroyRefreshToken: async (refreshToken) => {
        MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken);
        return true;
    },
    refreshExpiringRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, "my-very-secret-refresh-key", (err, payload) => {
                if (err) throw new Error(err);

                MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken);

                const newAccessToken = authHelpers.generateAccessToken(payload);
                const newRefreshToken = authHelpers.generateRefreshToken(payload);

                MockCache.refreshTokens.push(newRefreshToken);

                resolve({ newAccessToken, newRefreshToken });
            });
        });
    }
};

export default authService;
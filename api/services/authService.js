import jwt from "jsonwebtoken";

import MockCache from "./cache/mockCacheStore.js";
import authHelpers from "../utils/authHelpers.js";

const authService = {
    refreshExpiringRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, "my-very-secret-refresh-key", (err, payload) => {
                if (err) console.log(err);

                MockCache.refreshTokens = MockCache.refreshTokens.filter(token => token !== refreshToken);

                const newAccessToken = authHelpers.generateAccessToken(payload);
                const newRefreshToken = authHelpers.generateRefreshToken(payload);

                MockCache.refreshTokens.push(newRefreshToken);

                console.log("  ÚJ ACCESS", newAccessToken, "\n  ÚJ REFRESH", newRefreshToken)

                resolve({ newAccessToken, newRefreshToken });
                //return newAccessToken;
            });

        })
    }
};

export default authService;
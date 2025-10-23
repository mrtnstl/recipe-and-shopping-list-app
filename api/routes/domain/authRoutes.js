import express from "express";
import authController from "../../controllers/authController.js";

export function initAuthRouter(objectRepository) {
    const { login, logout, refresh } = authController;
    const { verify } = objectRepository;

    const authRouter = express.Router();

    authRouter.post("/login",
        login(objectRepository));
    authRouter.post("/logout",
        verify,
        logout(objectRepository));
    authRouter.post("/refresh",
        refresh(objectRepository));

    return authRouter;
}
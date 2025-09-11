import express from "express";
import authController from "../../controllers/authController.js";

export function initAuthRouter(objectRepository) {
    const { verify } = objectRepository;

    const authRouter = express.Router();

    authRouter.post("/login", authController.login(objectRepository));
    authRouter.post("/logout", verify, authController.logout(objectRepository));
    authRouter.post("/refresh", authController.refresh(objectRepository));

    return authRouter;
}
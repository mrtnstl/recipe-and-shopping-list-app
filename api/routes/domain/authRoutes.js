import express from "express";
import authController from "../../controllers/authController.js";
import { verify } from "../../middlewares/authMW.js";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/logout", verify, authController.logout);
authRouter.post("/refresh", authController.refresh);

export default authRouter;
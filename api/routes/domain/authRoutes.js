import express from "express";
const authRouter = express.Router();
//import authController
import authController from "../../controllers/authController.js";
//import middleware
import { verify } from "../../middlewares/authMW.js";


authRouter.post("/login", authController.login);
authRouter.post("/logout", verify, authController.logout);
authRouter.post("/refresh", authController.refresh);

export default authRouter;
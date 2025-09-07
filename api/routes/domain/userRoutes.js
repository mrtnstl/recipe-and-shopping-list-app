
/*
router.post("/", userController.createUser);
router.get("/:userId", userController.getUser);
router.put("/:userId", userController.modifyUser);
router.post("/forgot-password", userController.getForgotPasswordLink);
router.post("/:userId/:forgotPasswordToken", userController.setNewPassword);

*/



import express from "express";
const userRouter = express.Router();
//import authController
import userController from "../../controllers/userController.js";
//import middleware
import { verify } from "../../middlewares/authMW.js"; // req.user !!!


userRouter.post("/register", userController.register);
userRouter.get("/user/:userId", userController.getUser)
export default userRouter;
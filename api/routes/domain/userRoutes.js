import express from "express";
import userController from "../../controllers/userController.js";
import { verify } from "../../middlewares/authMW.js"; // req.user !!!

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.get("/user/:userId", userController.getUser);
// TODO: implement routes below
userRouter.put("/user/:userId");
userRouter.delete("/user/:userId");

export default userRouter;
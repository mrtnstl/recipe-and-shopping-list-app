import express from "express";
import userController from "../../controllers/userController.js";

export function initUserRouter(objectRepository) {
    const { verify } = objectRepository;
    const userRouter = express.Router();

    userRouter.post("/register", userController.register(objectRepository));
    userRouter.get("/user/:userId", userController.getUser(objectRepository));
    // TODO: implement routes below
    //userRouter.put("/user/:userId");
    //userRouter.delete("/user/:userId");

    return userRouter;
}
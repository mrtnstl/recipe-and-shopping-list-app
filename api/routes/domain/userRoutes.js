import express from "express";
const router = express.Router();

export default (objectRepository) => {
    const { userMW } = objectRepository;

    router.post("/", userController.createUser);
    router.get("/:userId", userController.getUser);
    router.put("/:userId", userController.modifyUser);
    router.post("/forgot-password", userController.getForgotPasswordLink);
    router.post("/:userId/:forgotPasswordToken", userController.setNewPassword);

    return router;
}
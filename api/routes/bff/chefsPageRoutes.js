import express from "express";
import chefsPageController from "../../controllers/chefsPageController.js";

export function initChefsPageRouter(objectRepository) {
    const chefsPageRouter = express.Router();

    chefsPageRouter.get("/:userId", chefsPageController.getPageData(objectRepository));

    return chefsPageRouter;
}
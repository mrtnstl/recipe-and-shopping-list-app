import express from "express";
import homePageController from "../../controllers/homePageController.js";

export function initHomePageRouter(objectRepository) {
    const homePageRouter = express.Router();

    homePageRouter.get("/", homePageController.getPageData(objectRepository));

    return homePageRouter;
}
// imports for DI
// third party packages
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// services and repositorys/models
import recipeService from "../services/recipeService.js";
import authService from "../services/authService.js";
import userService from "../services/userService.js";
import Users from "../repositories/userRepository.js";
import Recipes from "../repositories/recipeRepository.js";
// middleware
import { verify } from "../middlewares/authMW.js";
// cache storage
import * as Cache from "../services/cache/mockCacheStore.js";
// helpers
import authHelpers from "../utils/authHelpers.js";
import userHelpers from "../utils/userHelpers.js";
import ErrorClasses from "../utils/ErrorClasses.js";
// route initiator functions
import { initAuthRouter } from "./domain/authRoutes.js";
import { initUserRouter } from "./domain/userRoutes.js";
import { initRecipeRouter } from "./domain/recipeRoutes.js";
import { initHomePageRouter } from "./bff/homePageRoutes.js";

export default function initRoutes(app, pool) {
    const objectRepository = {
        pool, uuidv4, jwt, bcrypt, verify, Cache, recipeService, authService, userService,
        authHelpers, userHelpers, ErrorClasses, Users, Recipes
    };

    const authRouter = initAuthRouter(objectRepository);
    const userRouter = initUserRouter(objectRepository);
    const recipeRouter = initRecipeRouter(objectRepository);

    const homePageRouter = initHomePageRouter(objectRepository);

    app.use("/api", authRouter);
    app.use("/api", userRouter);
    app.use("/api", recipeRouter);
    app.use("/homepage", homePageRouter);

    // TODO: add express error mw

    // wildcard route
    app.use((req, res) => {
        return res.status(404).json({ message: "Not Found!" });
    });
}


// third party packages
import { v4 as uuidv4 } from "uuid";
// services and repositorys/models for dependency injection
import recipeService from "../services/recipeService.js";
import authService from "../services/authService.js";
import userService from "../services/userService.js";
import Users from "../repositories/userRepository.js";
import Recipes from "../repositories/recipeRepository.js";
// middleware
import { verify } from "../middlewares/authMW.js";
// cache storage
import MockCache from "../services/cache/mockCacheStore.js";
// route initiator functions
import { initAuthRouter } from "./domain/authRoutes.js";
import { initUserRouter } from "./domain/userRoutes.js";
import { initRecipeRouter } from "./domain/recipeRoutes.js";
// helpers
import authHelpers from "../utils/authHelpers.js";
import userHelpers from "../utils/userHelpers.js";
import ErrorClasses from "../utils/ErrorClasses.js";

export default function initRoutes(app, pool) {
    const objectRepository = {
        pool, uuidv4, verify, MockCache, recipeService, authService, userService,
        authHelpers, userHelpers, ErrorClasses, Users, Recipes
    };

    const authRouter = initAuthRouter(objectRepository);
    const userRouter = initUserRouter(objectRepository);
    const recipeRouter = initRecipeRouter(objectRepository);

    app.use("/api", authRouter);
    app.use("/api", userRouter);
    app.use("/api", recipeRouter);

    // wildcard route
    app.use((req, res) => {
        return res.status(404).json({ message: "Not Found!" });
    });
}


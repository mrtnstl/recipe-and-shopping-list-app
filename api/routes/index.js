// imports for DI
// third party packages
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// services and repositorys/models
import recipeService from "../services/recipeService.js";
import ingredientService from "../services/ingredientService.js";
import recipeIngredientsService from "../services/recipeIngredientsService.js";
import authService from "../services/authService.js";
import userService from "../services/userService.js";
import Users from "../repositories/userRepository.js";
import Recipes from "../repositories/recipeRepository.js";
import Ingredients from "../repositories/ingredientRepository.js";
import RecipeIngredients from "../repositories/recipeIngredientsRepository.js";
// middleware
import { verify } from "../middlewares/authMW.js";
// cache storage
import * as Cache from "../services/cache/mockCacheStore.js";
// helpers
import authHelpers from "../utils/authHelpers.js";
import userHelpers from "../utils/userHelpers.js";
import ingredientHelpers from "../utils/ingredientHelpers.js";
import ErrorClasses from "../utils/ErrorClasses.js";
import { InputValidator, InputSanitizer } from "../utils/validator.js";
// route initiator functions
import { initAuthRouter } from "./domain/authRoutes.js";
import { initUserRouter } from "./domain/userRoutes.js";
import { initRecipeRouter } from "./domain/recipeRoutes.js";
import { initHomePageRouter } from "./bff/homePageRoutes.js";
import { initChefsPageRouter } from "./bff/chefsPageRoutes.js";
import { initIngredientRouter } from "./domain/ingredientRoutes.js";
import { initRecipeIngredientsRouter } from "./domain/recipeIngredientsRoutes.js";

export default function initRoutes(app, pool) {
    const inputValidator = new InputValidator();
    const inputSanitizer = new InputSanitizer();

    const objectRepository = {
        pool, jwt, bcrypt,
        verify,
        Cache,
        recipeService, ingredientService, authService, userService, recipeIngredientsService,
        authHelpers, userHelpers, ingredientHelpers, ErrorClasses, inputValidator, inputSanitizer,
        Users, Recipes, Ingredients, RecipeIngredients
    };

    const authRouter = initAuthRouter(objectRepository);
    const userRouter = initUserRouter(objectRepository);
    const recipeRouter = initRecipeRouter(objectRepository);
    const ingredientRouter = initIngredientRouter(objectRepository);
    const recipeIngredientsRouter = initRecipeIngredientsRouter(objectRepository);

    const homePageRouter = initHomePageRouter(objectRepository);
    const chefsPageRouter = initChefsPageRouter(objectRepository);

    app.use("/api", authRouter);
    app.use("/api", userRouter);
    app.use("/api", recipeRouter);
    app.use("/api", ingredientRouter);
    app.use("/api", recipeIngredientsRouter);
    app.use("/homepage", homePageRouter);
    app.use("/chef", chefsPageRouter);

    // TODO: add express error mw

    // wildcard route
    app.use((req, res) => {
        return res.status(404).json({ message: "Not Found!" });
    });
}


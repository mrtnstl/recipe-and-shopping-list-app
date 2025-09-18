import express from "express";
import recipeController from "../../controllers/recipeController.js";

export function initRecipeRouter(objectRepository) {
    const recipeRouter = express.Router();

    recipeRouter.get("/recipe", recipeController.getRecipes(objectRepository));
    recipeRouter.get("/recipe/search", recipeController.searchRecipe(objectRepository));
    recipeRouter.get("/recipe/count", recipeController.getRecipeCount(objectRepository));
    recipeRouter.post("/recipe", recipeController.createRecipe(objectRepository));
    return recipeRouter;
}
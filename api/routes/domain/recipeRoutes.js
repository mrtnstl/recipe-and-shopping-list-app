import express from "express";
import recipeController from "../../controllers/recipeController.js";

export function initRecipeRouter(objectRepository) {
    const { getRecipes, searchRecipe, getRecipeCount, createRecipe, getRecipeById } = recipeController;
    const recipeRouter = express.Router();

    recipeRouter.get("/recipe", getRecipes(objectRepository));
    recipeRouter.get("/recipe/search", searchRecipe(objectRepository));
    recipeRouter.get("/recipe/count", getRecipeCount(objectRepository));
    recipeRouter.post("/recipe", createRecipe(objectRepository));
    recipeRouter.get("/recipe/:recipeId", getRecipeById(objectRepository));
    return recipeRouter;
}
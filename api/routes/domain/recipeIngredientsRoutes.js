import express from "express";
import recipeIngredientsController from "../../controllers/recipeIngredientsController.js";
export function initRecipeIngredientsRouter(objectRepository) {
    const recipeIngredientsRouter = express.Router();

    recipeIngredientsRouter.post("/recipe-ingredients/:recipeId", recipeIngredientsController.addRecipeIngredient(objectRepository));
    recipeIngredientsRouter.get("/recipe-ingredients/:recipeId", recipeIngredientsController.getRecipeIngredient(objectRepository));
    recipeIngredientsRouter.put("/recipe-ingredients/:recipeId/:ingredientId", recipeIngredientsController.modifyRecipeIngredient(objectRepository));
    recipeIngredientsRouter.delete("/recipe-ingredients/:recipeId/:ingredientId", recipeIngredientsController.removeRecipeIngredient(objectRepository));

    return recipeIngredientsRouter;
}


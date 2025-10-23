import express from "express";
import recipeIngredientsController from "../../controllers/recipeIngredientsController.js";
export function initRecipeIngredientsRouter(objectRepository) {
    const { addRecipeIngredient, getRecipeIngredient, modifyRecipeIngredient, removeRecipeIngredient } = recipeIngredientsController;
    const recipeIngredientsRouter = express.Router();

    recipeIngredientsRouter.post("/recipe-ingredients/:recipeId",
        /* TODO: check permissions */
        addRecipeIngredient(objectRepository));
    recipeIngredientsRouter.get("/recipe-ingredients/:recipeId",
        getRecipeIngredient(objectRepository));
    recipeIngredientsRouter.put("/recipe-ingredients/:recipeId/:ingredientId",
        /* TODO: check permissions */
        modifyRecipeIngredient(objectRepository));
    recipeIngredientsRouter.delete("/recipe-ingredients/:recipeId/:ingredientId",
        /* TODO: check permissions */
        removeRecipeIngredient(objectRepository));

    return recipeIngredientsRouter;
}


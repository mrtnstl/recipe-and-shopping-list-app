import express from "express";
import recipeIngredientsController from "../../controllers/recipeIngredientsController.js";
export function initRecipeIngredientsRouter(objectRepository) {
    const recipeIngredientsRouter = express.Router();

    recipeIngredientsRouter.post("/recipe-ingredients/:recipeId",
        /* TODO: check permissions */
        recipeIngredientsController.addRecipeIngredient(objectRepository));
    recipeIngredientsRouter.get("/recipe-ingredients/:recipeId",
        recipeIngredientsController.getRecipeIngredient(objectRepository));
    recipeIngredientsRouter.put("/recipe-ingredients/:recipeId", // /:ingredientId
        /* TODO: check permissions */
        recipeIngredientsController.modifyRecipeIngredient(objectRepository));
    recipeIngredientsRouter.delete("/recipe-ingredients/:recipeId/:ingredientId",
        /* TODO: check permissions */
        recipeIngredientsController.removeRecipeIngredient(objectRepository));

    return recipeIngredientsRouter;
}


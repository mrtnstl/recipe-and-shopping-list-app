import express from "express";
import ingredientController from "../../controllers/ingredientController.js";

export function initIngredientRouter(objectRepository) {
    const ingredientRouter = express.Router();

    ingredientRouter.get("/ingredients", ingredientController.getIngredients(objectRepository));
    ingredientRouter.post("/ingredients", ingredientController.createIngredients(objectRepository));
    ingredientRouter.get("/ingredients/:ingredientId", ingredientController.getIngredientById(objectRepository));
    ingredientRouter.get("/ingredients/search", ingredientController.searchIngredient(objectRepository));
    ingredientRouter.get("/ingredients/count", ingredientController.getCount(objectRepository));
    return ingredientRouter;
}
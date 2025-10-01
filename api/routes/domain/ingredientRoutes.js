import express from "express";
import ingredientController from "../../controllers/ingredientController.js";

export function initIngredientRouter(objectRepository) {
    const ingredientRouter = express.Router();

    ingredientRouter.get("/ingredients", ingredientController.getIngredients(objectRepository));
    ingredientRouter.get("/ingredient/search", ingredientController.searchIngredient(objectRepository));
    ingredientRouter.post("/ingredient", ingredientController.createIngredient(objectRepository));
    ingredientRouter.get("/ingredient/:ingredientId", ingredientController.getIngredientById(objectRepository));
    ingredientRouter.get("/ingredient/count", ingredientController.getCount(objectRepository));
    return ingredientRouter;
}
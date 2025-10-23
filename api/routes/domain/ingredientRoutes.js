import express from "express";
import ingredientController from "../../controllers/ingredientController.js";

export function initIngredientRouter(objectRepository) {
    const { getIngredients, createIngredients, searchIngredient, getCount, getIngredientById, modifyIngredient, deleteIngredient } = ingredientController;
    const ingredientRouter = express.Router();

    ingredientRouter.get("/ingredients",
        getIngredients(objectRepository));
    ingredientRouter.post("/ingredients",
        createIngredients(objectRepository));
    ingredientRouter.get("/ingredients/search",
        searchIngredient(objectRepository));   // TODO
    ingredientRouter.get("/ingredients/count",
        getCount(objectRepository));
    ingredientRouter.get("/ingredients/:ingredientId",
        getIngredientById(objectRepository));
    ingredientRouter.put("/ingredients/:ingredientId",
        modifyIngredient(objectRepository));
    ingredientRouter.delete("/ingredients/:ingredientId",
        deleteIngredient(objectRepository));
    return ingredientRouter;
}
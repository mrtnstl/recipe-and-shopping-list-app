import express from "express";
import recipeController from "../../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.get("/recipe", recipeController.getRecipes);
recipeRouter.get("/recipe/search", recipeController.searchRecipe);
recipeRouter.get("/recipe/count", recipeController.getRecipeCount);

export default recipeRouter;
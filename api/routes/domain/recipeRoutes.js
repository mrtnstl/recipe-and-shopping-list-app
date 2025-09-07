import express from "express";
import recipeController from "../../controllers/recipeController.js";

const recipeRoutes = express.Router();

recipeRoutes.get("/recipe", recipeController.getRecipes);
recipeRoutes.get("/recipe/count", recipeController.getRecipeCount);
export default recipeRoutes;
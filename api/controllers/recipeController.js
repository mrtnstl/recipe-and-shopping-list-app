import Recipes from "../repositories/recipeRepository.js";


const recipeController = {
    getRecipes: async (req, res, next) => {
        const { limit } = req.query;
        const recipes = await Recipes.find(limit);
        return res.status(200).json(recipes);
    },
    getRecipeCount: async (req, res, next) => {
        const recipeCount = await Recipes.count();
        return res.status(200).json({ recipe_count: recipeCount });
    },
    searchRecipe: async (req, res, next) => {
        const { keyword } = req.query;

        const serachTerm = keyword || "";

        const recipes = await Recipes.searchRecipe(serachTerm);
        return res.status(200).json(recipes);
    }
}
export default recipeController;
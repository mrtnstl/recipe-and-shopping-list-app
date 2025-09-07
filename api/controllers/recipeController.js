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
    }
}
export default recipeController;
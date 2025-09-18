import Recipes from "../repositories/recipeRepository.js";

const recipeService = {
    getRecipes: async (limit) => {
        const recipes = await Recipes.find(limit);
        return recipes;
    },
    getRecipeCount: async () => {
        const recipeCount = await Recipes.count();
        return recipeCount;
    },
    searchRecipe: async (serachTerm) => {
        const recipes = await Recipes.searchRecipe(serachTerm);
        return recipes;
    },
    newRecipe: (objectRepository) => {
        const { Recipes } = objectRepository;
        return async (newRecipe) => {
            return Recipes.insert(objectRepository)(newRecipe);
        }
    }
}
export default recipeService;
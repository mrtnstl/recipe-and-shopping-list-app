import Recipes from "../repositories/recipeRepository.js";

const recipeService = {
    getRecipes: (objectRepository) => {
        const { Recipes } = objectRepository;
        return async (limit) => {
            const recipes = await Recipes.find(objectRepository)(limit);
            return recipes;
        }
    },
    getRecipeCount: (objectRepository) => {
        return async () => {
            const recipeCount = await Recipes.count(objectRepository)();
            return recipeCount;
        }
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
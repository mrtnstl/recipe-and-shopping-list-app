class RecipeService {
    getRecipes(objectRepository) {
        const { Recipes } = objectRepository;
        return async (limit) => {
            const recipes = await Recipes.find(objectRepository)(limit);
            return recipes;
        }
    }
    getRecipeCount(objectRepository) {
        const { Recipes } = objectRepository;
        return async () => {
            const recipeCount = await Recipes.count(objectRepository)();
            return recipeCount;
        }
    }
    searchRecipe(objectRepository) {
        const { Recipes } = objectRepository;
        return async (serachTerm) => {
            const recipes = !serachTerm ? await Recipes.find(objectRepository)(10) : await Recipes.searchRecipe(objectRepository)(serachTerm);
            return recipes;
        }
    }
    newRecipe(objectRepository) {
        const { Recipes } = objectRepository;
        return async (newRecipe) => {
            return Recipes.insert(objectRepository)(newRecipe);
        }
    }
    getRecipeById(objectRepository) {
        const { Recipes } = objectRepository;
        return async (recipeId) => {
            const recipe = await Recipes.findById(objectRepository)(recipeId);
            return recipe;
        }
    }
}
export default new RecipeService();
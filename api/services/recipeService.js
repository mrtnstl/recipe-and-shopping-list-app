class RecipeService {
    getRecipes(objectRepository) {
        const { Recipes } = objectRepository;
        return async (limit, page) => {

            const recipeCount = await Recipes.count(objectRepository)(); // TODO: check cache
            const pageCount = Math.ceil(recipeCount.rows[0].count / limit);

            if (page < 1 || page > pageCount) throw new Error("Page is out of range!");

            const offset = (page - 1) * limit;

            const recipes = await Recipes.find(objectRepository)(limit, offset);
            if (!recipes) throw new Error("Not Found!");

            return { recipes, recipeCount: recipeCount.rows[0].count, page, pageCount };
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
    getRecipeByAuthorId(objectRepository) {
        const { Recipes } = objectRepository;
        return async (userId) => {
            const recipes = await Recipes.findByAuthor(objectRepository)(userId);
            return recipes;
        }
    }
}
export default new RecipeService();
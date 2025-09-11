const recipeController = {
    getRecipes: (objectRepository) => {
        const { recipeService } = objectRepository;
        return async (req, res, next) => {
            const { limit } = req.query;

            try {
                const recipes = await recipeService.getRecipes(limit);
                return res.status(200).json(recipes);
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
    getRecipeCount: (objectRepository) => {
        const { recipeService } = objectRepository;
        return async (req, res, next) => {
            try {
                const recipeCount = await recipeService.getRecipeCount();
                return res.status(200).json({ recipe_count: recipeCount });
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
    searchRecipe: (objectRepository) => {
        const { recipeService } = objectRepository;
        return async (req, res, next) => {
            const { keyword } = req.query;

            const serachTerm = keyword || "";

            try {
                const recipes = await recipeService.searchRecipe(serachTerm);
                return res.status(200).json(recipes);
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
}
export default recipeController;
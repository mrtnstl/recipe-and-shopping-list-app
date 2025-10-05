// TODO: recipe-ingredients create, update and delete functionality will need a way to determine if given recipe belongs to the authenticated user!!
class RecipeIngredientsController {
    // add new ingredient to recipe
    addRecipeIngredient(objectRepository) {
        const { recipeIngredientsService } = objectRepository;
        return async (req, res) => {
            if (typeof req.params.recipeId === "undefined" || typeof req.body === "undefined" || typeof req.body.recipeIngredients === "undefined")
                return res.status(400).json({ message: "Malformed Request!" });
            const { recipeId } = req.params;
            const { recipeIngredients } = req.body;

            try {
                const newRecipesCount = await recipeIngredientsService.createRecipeIngredients(objectRepository)(recipeId, recipeIngredients);
                return res.status(200).json({ message: `${newRecipesCount} recipe(s) added` });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
    // get all ingredients of recipe
    getRecipeIngredient(objectRepository) {
        const { recipeIngredientsService } = objectRepository;
        return async (req, res) => {
            if (req.params.recipeId === undefined) return res.status(400).json({ message: "Malformed Request!" });
            const { recipeId } = req.params;

            try {
                const recipeIngredients = await recipeIngredientsService.getRecipeIngredients(objectRepository)(recipeId);
                return res.status(200).json(recipeIngredients);
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
    // update ingredients quantity in recipe
    modifyRecipeIngredient(objectRepository) {
        const { recipeIngredientsService } = objectRepository;
        return async (req, res) => {
            const { recipeId, ingredientId } = req.params;
            const { newQuantity } = req.body;
            if (typeof recipeId === "undefined" || typeof ingredientId === "undefined" || typeof req.body === "undefined")
                return res.status(400).json({ message: "Malformed Request!" });

            try {
                const updatedRecipeCount = await recipeIngredientsService.modifyRecipeIngredient(objectRepository)(recipeId, ingredientId, newQuantity);
                return res.status(200).json({ message: `Updated ${updatedRecipeCount} Rows!` });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
    // delete ingredient from recipe
    removeRecipeIngredient(objectRepository) {
        const { recipeIngredientsService } = objectRepository;
        return async (req, res) => {
            const { recipeId, ingredientId } = req.params;
            if (recipeId === undefined || ingredientId === undefined)
                return res.status(400).json({ message: "Malformed Request!" });

            try {
                const removedRecipeIngredientName = await recipeIngredientsService.removeRecipeIngredient(objectRepository)(recipeId, ingredientId);
                return res.status(200).json({ message: `${removedRecipeIngredientName} were deleted!` });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
}
export default new RecipeIngredientsController();
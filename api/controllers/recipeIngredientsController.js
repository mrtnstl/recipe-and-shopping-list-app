class RecipeIngredientsController {
    // add new ingredient to recipe
    addRecipeIngredient(objectRepository) {
        const { recipeIngredientsService, inputValidator, inputSanitizer } = objectRepository;
        return async (req, res) => {
            const { isUndefined, isArrayAndIsLength } = inputValidator;
            const { trimString, escape, stripLow } = inputSanitizer; // TODO: 

            const { recipeId } = req.params;
            const { recipeIngredients } = req.body ?? {};

            if (isUndefined(recipeId) || isUndefined(recipeIngredients))
                return res.status(400).json({ message: "Invalid Request!" });

            if (!isArrayAndIsLength(recipeIngredients, { max: 50 }))
                return res.status(400).json({ message: "'recipeIngredients' should be an array containing 50 items maximum!" });

            if (!isArrayAndIsLength(recipeIngredients, { min: 1 }))
                return res.status(400).json({ message: "'recipeIngredients' should be an array containing 1 item minimum!" });

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
        const { recipeIngredientsService, inputValidator } = objectRepository;
        return async (req, res) => {
            const { isUndefined } = inputValidator;
            const { recipeId } = req.params;

            if (isUndefined(recipeId)) return res.status(400).json({ message: "Invalid Request!" });

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
        const { recipeIngredientsService, inputValidator } = objectRepository;
        return async (req, res) => {
            const { isUndefined, isNumber } = inputValidator;
            const { recipeId, ingredientId } = req.params;
            const { newQuantity } = req.body ?? {};

            if (isUndefined(recipeId) || isUndefined(ingredientId) || isUndefined(req.body) || isUndefined(newQuantity))
                return res.status(400).json({ message: "Invalid Request!" });

            if (!isNumber(newQuantity))
                return res.status(400).json({ message: "'newQuantity' should be of type number!" });

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
        const { recipeIngredientsService, inputValidator } = objectRepository;
        return async (req, res) => {
            const { isUndefined } = inputValidator;
            const { recipeId, ingredientId } = req.params;

            if (isUndefined(recipeId) || isUndefined(ingredientId))
                return res.status(400).json({ message: "Invalid Request!" });

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
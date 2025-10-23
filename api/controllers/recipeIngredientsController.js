class RecipeIngredientsController {
    // add new ingredient to recipe
    addRecipeIngredient(objectRepository) {
        const { recipeIngredientsService, inputValidator, inputSanitizer, recipeIngredientSchema } = objectRepository;
        return async (req, res) => {
            const { isUndefined } = inputValidator;
            const { trimString, escape, stripLow } = inputSanitizer; // TODO: 

            const { recipeId } = req.params;
            const { recipeIngredients } = req.body ?? {};

            if (isUndefined(recipeId))
                return res.status(400).json({ message: "Invalid Request!" });

            const { error } = recipeIngredientSchema.validate(recipeIngredients);
            if (error)
                return res.status(422).json({ message: error.message });

            try {
                const newRecipesCount = await recipeIngredientsService.createRecipeIngredients(objectRepository)(recipeId, recipeIngredients);
                return res.status(201).json({ message: `${newRecipesCount} recipe(s) added` });
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
            const { isUndefined, isNumber, NumberInRange } = inputValidator;
            const { recipeId, ingredientId } = req.params;
            const { newQuantity } = req.body ?? {};

            if (isUndefined(recipeId) || isUndefined(ingredientId) || isUndefined(newQuantity))
                return res.status(400).json({ message: "Invalid Request!" });

            if (!isNumber(newQuantity))
                return res.status(400).json({ message: "Invalid Input!" });

            if (!NumberInRange(newQuantity, { gt: 0, lt: 32760 }))
                return res.status(422).json({ message: "Quantity should be between 1 and 32760" });

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
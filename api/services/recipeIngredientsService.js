class RecipeIngredientsService {
    createRecipeIngredients(objectRepository) {
        const { RecipeIngredients } = objectRepository;
        return async (recipeId, recipeIngredients) => {
            if (recipeIngredients.length > 1) {
                const ingredientIdsArray = [], quantitysArray = [];
                recipeIngredients.map(item => {
                    ingredientIdsArray.push(item.ingredientId);
                    quantitysArray.push(item.quantity);
                })
                const insertedRecipeIngredients = await RecipeIngredients.insertMany(objectRepository)(recipeId, ingredientIdsArray, quantitysArray);
                return insertedRecipeIngredients.rows[0].count;
            } else {
                const { ingredientId, quantity } = recipeIngredients[0];
                const assembledRecIng = { recipeId, ingredientId, quantity };
                const insertedRecipeIngredient = await RecipeIngredients.insertOne(objectRepository)(assembledRecIng);
                return insertedRecipeIngredient.rowCount;
            }
        }
    }
    getRecipeIngredients(objectRepository) {
        const { RecipeIngredients } = objectRepository;
        return async (recipeId) => {
            const recipeIngredients = await RecipeIngredients.selectManyWhereId(objectRepository)(recipeId);
            if (recipeIngredients.rows.length < 1) throw new Error("The Selected Recipe Has No Defined Ingredients!");
            return recipeIngredients.rows;
        }
    }
    modifyRecipeIngredient(objectRepository) {
        const { RecipeIngredients } = objectRepository;
        return async (recipeId, ingredientId, newQuantity) => {
            const updatedRecipeIngredient = await RecipeIngredients.updateWhereId(objectRepository)(recipeId, ingredientId, newQuantity);
            if (updatedRecipeIngredient.rowCount < 1) throw new Error("No Rows Were Affected By Update!");
            return updatedRecipeIngredient.rowCount;
        }
    }
    removeRecipeIngredient(objectRepository) {
        const { RecipeIngredients } = objectRepository;
        return async (recipeId, ingredientId) => {
            const removedRecIngName = await RecipeIngredients.deleteWhereId(objectRepository)(recipeId, ingredientId);
            console.log(removedRecIngName.rowCount)
            if (removedRecIngName.rowCount < 1) throw new Error("No Record Were Deleted!");
            return removedRecIngName.rows[0].name;
        }
    }
}
export default new RecipeIngredientsService();
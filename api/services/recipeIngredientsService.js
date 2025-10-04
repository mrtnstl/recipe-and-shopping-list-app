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
                const insertedRecipeIngredient = await RecipeIngredients.insertOne(objectRepository)({ recipeId, ingredientId, quantity });
                return insertedRecipeIngredient.rows[0].count;
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
}
export default new RecipeIngredientsService();
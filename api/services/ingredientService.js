class IngredientService {
    getIngredients(objectRepository) {
        const { Ingredients } = objectRepository;
        return async (limit, page) => {
            const ingredientCount = await Ingredients.count(objectRepository)(); // TODO: this should check Cache in the future
            const pageCount = Math.ceil(ingredientCount.rows[0].count / limit);
            if (page < 1 || page > pageCount) throw new Error("Page is out of range!");

            const offset = (page - 1) * limit;

            const ingredients = await Ingredients.selectMany(objectRepository)(limit, offset);
            if (!ingredients) throw new Error("Not Found!");

            return { ingredients, ingredientCount: ingredientCount.rows[0].count, page, pageCount };
        }
    }
    createIngredients(objectRepository) {
        const { Ingredients, ingredientHelpers } = objectRepository;
        return async (newIngredients) => {
            if (newIngredients.length > 1) {
                const idsArray = [], namesArray = [], unitsArray = [], typesArray = [];
                newIngredients.map(item => {    // TODO: maybe rethink this map method
                    idsArray.push(ingredientHelpers.genIngredientId(item.ingredientName));
                    namesArray.push(item.ingredientName);
                    unitsArray.push(item.unit);
                    typesArray.push(item.ingredientType);
                });
                const result = await Ingredients.insertMany(objectRepository)(idsArray, namesArray, unitsArray, typesArray);
                return result;
            } else {
                const ingredientId = ingredientHelpers.genIngredientId(newIngredients[0].ingredientName);
                const result = await Ingredients.insertOne(objectRepository)(ingredientId, {
                    name: newIngredients[0].ingredientName,
                    unit: newIngredients[0].unit,
                    type: newIngredients[0].ingredientType
                });
                return result;
            }
        }
    }
    getIngredientById(objectRepository) {
        const { Ingredients } = objectRepository;
        return async (ingredientId) => {
            const ingredient = await Ingredients.selectOneById(objectRepository)(ingredientId);
            if (!ingredient) {
                throw new Error("Not Found!");
            }
            return ingredient;
        }
    }
    updateIngredient(objectRepository) {
        const { Ingredients } = objectRepository;
        return async (ingredientId, ingredientData) => {

            const withId = (id, obj) => { return { id: id, ...obj } }; // TODO: remove hof, just pass arguments to update func
            const hydratedIngredientData = withId(ingredientId, ingredientData);

            const updateIngredient = await Ingredients.updateWhereId(objectRepository)(hydratedIngredientData);
            if (updateIngredient.rowCount === 0) throw new Error("No Record Affected!");

            return updateIngredient.rows[0].id;
        }
    }
    deleteIngredient(objectRepository) {
        const { Ingredients } = objectRepository;
        return async (ingredientId) => {
            const deletedIngredient = await Ingredients.deleteOneWhereId(objectRepository)(ingredientId);
            if (deletedIngredient.rowCount === 0) throw new Error("No Record Deleted!");
            return deletedIngredient.rows[0].id;
        }
    }
    getCount(objectRepository) {
        const { Ingredients } = objectRepository;
        return async () => {
            const ingredientCount = await Ingredients.count(objectRepository)(); // TODO: check cache first
            return ingredientCount.rows[0].count;
        }
    }
}
export default new IngredientService();
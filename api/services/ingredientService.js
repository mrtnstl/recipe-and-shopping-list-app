class IngredientService {
    getIngredients(objectRepository) {
        const { Ingredients } = objectRepository;
        return async (limit, page) => {
            const ingredientCount = await Ingredients.count(objectRepository)(); // TODO: this should check Cache in the future
            console.log(ingredientCount)
            const pageCount = Math.ceil(ingredientCount / limit);
            if (page < 1 || page > pageCount) throw new Error("Page is out of range!");

            const offset = (page - 1) * limit;

            const ingredients = await Ingredients.selectMany(objectRepository)(limit, offset);

            return { ingredients, ingredientCount, page, pageCount };
        }
    }
    createIngredients(objectRepository) {
        const { Ingredients, ingredientHelpers } = objectRepository;
        return async (newIngredients) => {
            if (newIngredients.length > 1) {
                const idsArray = [], namesArray = [], unitsArray = [], typesArray = [];
                newIngredients.map(item => {    // TODO: maybe rethink this map method
                    item.ingredientType = item.ingredientType ?? "";

                    idsArray.push(ingredientHelpers.genIngredientId(item.ingredientName));
                    namesArray.push(item.ingredientName);
                    unitsArray.push(item.unit);
                    typesArray.push(item.ingredientType);
                });
                const result = await Ingredients.insertMany(objectRepository)(idsArray, namesArray, unitsArray, typesArray);
                return result;
            } else {
                newIngredients.ingredientType = newIngredients.ingredientType ?? "";

                const ingredientId = ingredientHelpers.genIngredientId(newIngredients.ingredientName);
                const result = await Ingredients.insertOne(objectRepository)(ingredientId, newIngredients);
                return result;
            }
        }
    }
}
export default new IngredientService();
class RecipeIngredientsRepository {
    insertOne(objectRepository) {
        const { pool } = objectRepository;
        return async (recipeIngredient) => {
            try {
                const result = await pool.query(
                    "INSERT INTO recipe_ingredients(recipe_id, ingredient_id, quantity) VALUES ($1, $2, $3);",
                    [recipeIngredient.recipeId, recipeIngredient.ingredientId, recipeIngredient.quantity]
                );
                console.log(result)
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    insertMany(objectRepository) {
        const { pool } = objectRepository;
        return async (recipeId, ingredientIdsArray, quantitysArray) => {
            try {
                const result = await pool.query(
                    "INSERT INTO recipe_ingredients(recipe_id, ingredient_id, quantity) SELECT $1, * FROM UNNEST($2::text[], $3::smallint[]);",
                    [recipeId, ingredientIdsArray, quantitysArray]
                );
                console.log(result)
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    selectManyWhereId(objectRepository) {
        const { pool } = objectRepository;
        return async (recipeId) => {
            try {
                const result = await pool.query(
                    "SELECT " +
                    "i.id AS ingredient_id, " +
                    "i.name AS ingredient_name, " +
                    "i.unit AS ingredient_unit, " +
                    "ri.quantity " +
                    "FROM recipe_ingredients AS ri " +
                    "JOIN ingredients AS i ON ri.ingredient_id = i.id " +
                    "WHERE ri.recipe_id = $1 ORDER BY i.name ASC, i.id ASC;",
                    [recipeId]
                );
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    updateWhereId(objectRepository) {
        const { pool } = objectRepository;
        return async (recipeId, ingredientId, newQuantity) => {
            try {
                const result = await pool.query(
                    "UPDATE recipe_ingredients SET quantity = $3 WHERE recipe_id = $1 AND ingredient_id = $2;",
                    [recipeId, ingredientId, newQuantity]
                );
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    deleteWhereId(objectRepository) {
        const { pool } = objectRepository;
        return async (recipeId, ingredientId) => {
            try {
                const result = await pool.query(
                    "DELETE FROM recipe_ingredients WHERE recipe_id = $1 AND ingredient_id = $2 RETURNING (SELECT name FROM ingredients WHERE id = $2);",
                    [recipeId, ingredientId]
                );
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}
const RecipeIngredients = new RecipeIngredientsRepository();
export default RecipeIngredients;
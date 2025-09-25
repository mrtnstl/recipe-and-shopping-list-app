const Recipes = {
    searchRecipe: (objectRepository) => {
        const { pool } = objectRepository;
        return async (searchTerm) => {
            try {
                const searchResult = await pool.query("SELECT * FROM recipes WHERE title = $1 ORDER BY created_at DESC;", [searchTerm]); // TODO: rethink this!
                return searchResult.rows;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    find: (objectRepository) => {
        const { pool } = objectRepository;
        return async (limit) => {
            try {
                const { rows } = await pool.query("SELECT * FROM recipes ORDER BY created_at DESC LIMIT $1 OFFSET 0;", [limit]);
                return rows;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    count: (objectRepository) => {
        const { pool } = objectRepository;
        return async () => {
            try {
                const recipeCount = await pool.query("SELECT COUNT(*) FROM recipes;");
                return recipeCount.rows[0].count;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    insert: (objectRepository) => {
        const { pool } = objectRepository;
        return async (newRecipe) => {
            try {
                const recipe = await pool.query("INSERT INTO recipes(id, title, user_id, description, minutes_needed) VALUES($1, $2, $3, $4, $5) RETURNING id;", newRecipe);
                console.log(recipe.rows[0].id) // TODO: delete clg when not needed
                return recipe.rows[0].id;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    findById: (objectRepository) => {
        const { pool } = objectRepository;
        return async (recipeId) => {
            try {
                const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [recipeId]);
                console.log(recipe.rows[0]); // TODO: delete when not needed
                return recipe.rows[0];
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}

export default Recipes;
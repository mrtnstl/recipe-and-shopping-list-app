const Recipes = {
    searchRecipe: (objectRepository) => {
        const { pool } = objectRepository;
        return async (searchTerm) => {
            try {
                const searchResult = await pool.query("SELECT *, ts_rank(to_tsvector(title || ' ' || description), websearch_to_tsquery($1)) as rank FROM recipes WHERE to_tsvector(title || ' ' || description) @@ websearch_to_tsquery($1) ORDER BY rank DESC, created_at DESC;", [searchTerm]); // TODO: rethink this!
                return searchResult.rows;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    find: (objectRepository) => {
        const { pool } = objectRepository;
        return async (limit, offset) => {
            try {
                const { rows } = await pool.query("SELECT * FROM recipes ORDER BY created_at DESC LIMIT $1 OFFSET $2;", [limit, offset]);
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
                const recipeCount = await pool.query("SELECT COUNT(*) FROM recipes;"); // returning count?????
                return recipeCount;
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
    },
    findByAuthor: (objectRepository) => {
        const { pool } = objectRepository;
        return async (userId) => {
            try {
                const recipes = await pool.query("SELECT * FROM recipes WHERE user_id = $1", [userId]);
                return recipes.rows;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}

export default Recipes;
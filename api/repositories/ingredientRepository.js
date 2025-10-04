class IngredientRepository {
    selectOneById(objectRepository) {
        const { pool } = objectRepository;
        return async (id) => {
            try {
                const result = await pool.query("SELECT * FROM ingredients WHERE id = $1;", [id]);
                return result.rows[0];
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    selectMany(objectRepository) {
        const { pool } = objectRepository;
        return async (limit, offset) => {
            try {
                const result = await pool.query("SELECT * FROM ingredients ORDER BY name ASC LIMIT $1 OFFSET $2;", [limit, offset]); //

                return result.rows;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    insertOne(objectRepository) {
        const { pool } = objectRepository;
        return async (id, { name, unit, type }) => {
            try {
                const result = await pool.query("INSERT INTO ingredients(id, name, unit, type) VALUES($1, $2, $3, $4);", [id, name, unit, type]);
                return true;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    insertMany(objectRepository) {
        const { pool } = objectRepository;
        return async (idsArray, namesArray, unitsArray, typesArray) => {
            try {
                const result = await pool.query("INSERT INTO ingredients(id, name, unit, type) SELECT * FROM UNNEST ($1::text[], $2::varchar[], $3::varchar[], $4::varchar[]);", [idsArray, namesArray, unitsArray, typesArray]);
                return true; // TODO: return number of records inserted
            } catch (err) {
                throw new Error(err.message);
            }
        }

    }
    updateWhereId(objectRepository) {
        const { pool } = objectRepository;
        return async (ingredientData) => {
            try {
                const result = await pool.query("UPDATE ingredients SET name = $2, unit = $3, type = $4 WHERE id = $1 RETURNING id;", [ingredientData.id, ingredientData.ingredientName, ingredientData.unit, ingredientData.ingredientType]);
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    deleteOneWhereId(objectRepository) {
        const { pool } = objectRepository;
        return async (id) => {
            try {
                const result = await pool.query("DELETE FROM ingredients WHERE id = $1 RETURNING id;", [id]);
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    count(objectRepository) {
        const { pool } = objectRepository;
        return async () => {
            try {
                const result = await pool.query("SELECT COUNT(*) FROM ingredients;");
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}
const Ingredients = new IngredientRepository();
export default Ingredients;
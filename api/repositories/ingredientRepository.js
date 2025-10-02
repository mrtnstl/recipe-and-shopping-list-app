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
                return true;
            } catch (err) {
                throw new Error(err.message);
            }
        }

    }
    deleteOneById(objectRepository) {
        const { pool } = objectRepository;
        return async (id) => {
            try {
                const result = await pool.query("DELETE FROM ingredients WHERE id = $1 RETURNING name;", [id]);
                return result.rows[0];
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
                return result.rows[0].count;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}
const Ingredients = new IngredientRepository();
export default Ingredients;
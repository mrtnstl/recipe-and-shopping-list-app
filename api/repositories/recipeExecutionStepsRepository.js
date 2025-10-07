class RecipeExecutionStepsRepository {
    insertOne(objectRepository) {
        const { pool } = objectRepository;
        return async (execSteps) => {
            try {
                const result = await pool.query(
                    "INSERT INTO execution_steps(recipe_id, step_num, description) VALUES ($1, $2, $3);",
                    [execSteps.recipeId, execSteps.stepNum, execSteps.description]
                );
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    insertMany(objectRepository) {
        const { pool } = objectRepository;
        return async (recipeId, stepNumsArray, descriptionsArray) => {
            try {
                const result = await pool.query(
                    "INSERT INTO execution_steps(recipe_id, step_num, description) SELECT $1 ,* FROM UNNEST($2::smallint[], $3::text[]);",
                    [recipeId, stepNumsArray, descriptionsArray]
                );
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
                    "SELECT * FROM execution_steps WHERE recipe_id = $1 ORDER BY step_num ASC;",
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
        return async (recipeId, execStepId, newStepNum, newDesc) => {
            try {
                const result = await pool.query(
                    "UPDATE execution_steps SET step_num = $3, description = $4 WHERE recipe_id = $1 AND id = $2;",
                    [recipeId, execStepId, newStepNum, newDesc]
                );
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    deleteWhereId(objectRepository) {
        const { pool } = objectRepository;
        return async (recipeId, execStepId) => {
            try {
                const result = await pool.query(
                    "DELETE FROM execution_steps WHERE recipe_id = $1 AND id = $2 RETURNING id as stepnum;",
                    [recipeId, execStepId]
                );
                return result;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
}
const ExecutionSteps = new RecipeExecutionStepsRepository();
export default ExecutionSteps;
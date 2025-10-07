class RecipeExecutionStepsService {
    createExecSteps(objectRepository) {
        const { ExecutionSteps } = objectRepository;
        return async (recipeId, recipeExecSteps) => {
            let newExecSteps;

            if (recipeExecSteps.length > 1) {
                const stepNumsArray = [], descriptionsArray = [];
                recipeExecSteps.map(item => {
                    stepNumsArray.push(item.stepNum);
                    descriptionsArray.push(item.description);
                })
                newExecSteps = await ExecutionSteps.insertMany(objectRepository)(recipeId, stepNumsArray, descriptionsArray)

            } else {
                newExecSteps = await ExecutionSteps.insertOne(objectRepository)({ recipeId, ...recipeExecSteps[0] });
            }
            return newExecSteps.rowCount;
        }
    }
    getExecSteps(objectRepository) {
        const { ExecutionSteps } = objectRepository;
        return async (recipeId) => {
            const execSteps = await ExecutionSteps.selectManyWhereId(objectRepository)(recipeId);
            if (execSteps.rows.count < 1) throw new Error("The Selected Recipe Has No Execution Steps Assigned To It!");
            return execSteps.rows;
        }
    }
    modifyExeceStep(objectRepository) {
        const { ExecutionSteps } = objectRepository;
        return async (recipeId, execStepId, newStepNum, newDesc) => {
            const updatedExecStep = await ExecutionSteps.updateWhereId(objectRepository)(recipeId, execStepId, newStepNum, newDesc);
            if (updatedExecStep.rowCount < 1) throw new Error("No Rows Were Updated!");
            return updatedExecStep.rowCount;
        }
    }
    removeExecStep(objectRepository) {
        const { ExecutionSteps } = objectRepository;
        return async (recipeId, execStepId) => {
            const removedExecStep = await ExecutionSteps.deleteWhereId(objectRepository)(recipeId, execStepId);
            if (removedExecStep.rowCount < 1) throw new Error("No Record Were Deleted!");
            return removedExecStep.rows[0].stepnum;
        }
    }
}
export default new RecipeExecutionStepsService();
class RecipeExecutionStepsController {
    // add new execution step(s) to recipe
    addExecSteps(objectRepository) {
        const { recipeExecutionStepsService, inputValidator } = objectRepository;
        return async (req, res) => {
            const { isUndefined, isArrayAndIsLength } = inputValidator;

            const { recipeId } = req.params;
            const { recipeExecSteps } = req.body ?? {};

            if (isUndefined(recipeId) || isUndefined(recipeExecSteps))
                return res.status(400).json({ message: "Invalid Request!" });
            // TODO: separate array type check and length checks in validator.js
            if (!isArrayAndIsLength(recipeExecSteps, { max: 50 })) // TODO: count constraints should be implemented on the frontend
                return res.status(400).json({ message: "'recipeExecSteps' should be an array containing 50 items maximum!" });

            if (!isArrayAndIsLength(recipeExecSteps, { min: 1 }))
                return res.status(400).json({ message: "'recipeExecSteps' should be an array containing 1 item minimum!" });

            try {
                const newExecStepsCount = await recipeExecutionStepsService.createExecSteps(objectRepository)(recipeId, recipeExecSteps);
                return res.status(201).json({ message: `${newExecStepsCount} execution step added` });
            } catch (err) {
                console.log(err) // TODO: add a unified custom error constructor which is aware to db errors
                return res.status(400).json({ message: err.message });
            }
        }
    }
    // get executon steps of recipe
    getExecSteps(objectRepository) {
        const { recipeExecutionStepsService, inputValidator } = objectRepository;
        return async (req, res) => {
            const { isUndefined } = inputValidator;
            const { recipeId } = req.params;

            if (isUndefined(recipeId)) return res.status(400).json({ message: "Invalid Request!" });

            try {
                const executionSteps = await recipeExecutionStepsService.getExecSteps(objectRepository)(recipeId);
                return res.status(200).json(executionSteps);
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
    // update execution step
    modifyExecSteps(objectRepository) {
        const { recipeExecutionStepsService, inputValidator } = objectRepository;
        return async (req, res) => {
            const { isUndefined, isNumber } = inputValidator;
            const { recipeId, execStepId } = req.params;
            const { newStepNum, newDesc } = req.body ?? {};

            if (isUndefined(recipeId) || isUndefined(execStepId) || isUndefined(newStepNum) || isUndefined(newDesc))
                return res.status(400).json({ message: "Invalid Request!" });

            if (!isNumber(newStepNum))
                return res.status(400).json({ message: "'newQuantity' should be of type number!" });

            // TODO: check if typeof newDesc === "string"

            try {
                const updatedExecStepCount = await recipeExecutionStepsService.modifyExecStep(objectRepository)(recipeId, execStepId, newStepNum, newDesc);
                return res.status(200).json({ message: `Updated ${updatedExecStepCount} Rows!` });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
    // delete execution step
    removeExecSteps(objectRepository) {
        const { recipeExecutionStepsService, inputValidator } = objectRepository;
        return async (req, res) => {
            const { isUndefined } = inputValidator;
            const { recipeId, execStepId } = req.params;

            if (isUndefined(recipeId) || isUndefined(execStepId))
                return res.status(400).json({ message: "Invalid Request!" });

            try {
                const removedExecStepNum = await recipeExecutionStepsService.removeExecStep(objectRepository)(recipeId, execStepId);
                return res.status(200).json({ message: `Step #${removedExecStepNum} were deleted!` });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
}
export default new RecipeExecutionStepsController();
class RecipeExecutionStepsController {
    // add new execution step(s) to recipe
    addExecSteps(objectRepository) {
        const { recipeExecutionStepsService, inputValidator, executionStepSchema } = objectRepository;
        return async (req, res) => {
            const { isUndefined } = inputValidator;
            const { recipeId } = req.params;
            const { recipeExecSteps } = req.body ?? {};

            if (isUndefined(recipeId))
                return res.status(400).json({ message: "Invalid Request!" });

            const { error } = executionStepSchema.validate(recipeExecSteps);
            if (error)
                return res.status(422).json({ message: error.message });

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
        const { recipeExecutionStepsService, inputValidator, executionStepSchema } = objectRepository;
        return async (req, res) => {
            const { isUndefined } = inputValidator;
            const { recipeId, execStepId } = req.params;
            const { stepNum, description } = req.body ?? {};

            if (isUndefined(recipeId) || isUndefined(execStepId))
                return res.status(400).json({ message: "Invalid Request!" });

            const { error } = executionStepSchema.validate([{ stepNum, description }]);
            if (error) return res.status(422).json({ message: error.message });

            try {
                const updatedExecStepCount = await recipeExecutionStepsService.modifyExecStep(objectRepository)(recipeId, execStepId, stepNum, description);
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
                return res.status(200).json({ message: `Step #${removedExecStepNum} was deleted!` });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
}
export default new RecipeExecutionStepsController();
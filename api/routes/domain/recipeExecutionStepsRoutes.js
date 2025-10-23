//recipeExecutionStepsRoutes.js
import express from "express";
import recipeExecutionStepsController from "../../controllers/recipeExecutionStepsController.js";
export function initRecipeExecutionStepsRouter(objectRepository) {
    const { addExecSteps, getExecSteps, modifyExecSteps, removeExecSteps } = recipeExecutionStepsController;
    const recipeExecutionStepsRouter = express.Router();

    recipeExecutionStepsRouter.post("/exec-steps/:recipeId",
        /* TODO: check permissions */
        (req, res, next) => {
            console.log(JSON.stringify(req.body))
            next();
        },
        addExecSteps(objectRepository));
    recipeExecutionStepsRouter.get("/exec-steps/:recipeId",
        getExecSteps(objectRepository));
    recipeExecutionStepsRouter.put("/exec-steps/:recipeId/:execStepId",
        /* TODO: check permissions */
        modifyExecSteps(objectRepository));
    recipeExecutionStepsRouter.delete("/exec-steps/:recipeId/:execStepId",
        /* TODO: check permissions */
        removeExecSteps(objectRepository));

    return recipeExecutionStepsRouter;
}


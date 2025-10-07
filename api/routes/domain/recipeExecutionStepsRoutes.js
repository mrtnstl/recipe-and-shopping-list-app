//recipeExecutionStepsRoutes.js
import express from "express";
import recipeExecutionStepsController from "../../controllers/recipeExecutionStepsController.js";
export function initRecipeExecutionStepsRouter(objectRepository) {
    const recipeExecutionStepsRouter = express.Router();

    recipeExecutionStepsRouter.post("/exec-steps/:recipeId",
        /* TODO: check permissions */
        recipeExecutionStepsController.addExecSteps(objectRepository));
    recipeExecutionStepsRouter.get("/exec-steps/:recipeId",
        recipeExecutionStepsController.getExecSteps(objectRepository));
    recipeExecutionStepsRouter.put("/exec-steps/:recipeId/:execStepId",
        /* TODO: check permissions */
        recipeExecutionStepsController.modifyExecSteps(objectRepository));
    recipeExecutionStepsRouter.delete("/exec-steps/:recipeId/:execStepId",
        /* TODO: check permissions */
        recipeExecutionStepsController.removeExecSteps(objectRepository));

    return recipeExecutionStepsRouter;
}


// schemas for recipe object validation(primitives should be validated by validator.js!!)
import Joi from "joi";
import { recipeConstants } from "../constants/schemaConstants.js";
const {
    RECIPE_NAME_MIN_CHAR,
    RECIPE_NAME_MAX_CHAR,
    RECIPE_DESC_MIN_CHAR,
    RECIPE_DESC_MAX_CHAR,
    RECIPE_TIME_MIN,
    RECIPE_TIME_MAX,
    REC_ING_QUANT_MIN,
    REC_ING_QUANT_MAX,
    EXEC_STEP_ARRAY_MIN_L,
    EXEC_STEP_ARRAY_MAX_L,
    EXEC_STEP_NUM_MIN,
    EXEC_STEP_NUM_MAX,
    EXEC_STEP_DESC_MIN,
    EXEC_STEP_DESC_MAX
} = recipeConstants;

export const recipeSchema = Joi.object({
    recipeId: Joi.string().required(),
    authorId: Joi.string().required(),
    recipeName: Joi.string().min(RECIPE_NAME_MIN_CHAR).max(RECIPE_NAME_MAX_CHAR).required(),
    recipeDescription: Joi.string().min(RECIPE_DESC_MIN_CHAR).max(RECIPE_DESC_MAX_CHAR).required(),
    minutesNeeded: Joi.number().min(RECIPE_TIME_MIN).max(RECIPE_TIME_MAX).required()
});
export const recipeIngredientSchema = Joi.array().min(1).max(50).items(
    Joi.object({
        recipeId: Joi.string().required(),
        ingredientId: Joi.string().required(),
        quantity: Joi.number().min(REC_ING_QUANT_MIN).max(REC_ING_QUANT_MAX).required()
    })
);
export const executionStepSchema = Joi.array().min(EXEC_STEP_ARRAY_MIN_L).max(EXEC_STEP_ARRAY_MAX_L).items(
    Joi.object({
        // recipeId: Joi.string().required(),
        stepNum: Joi.number().min(EXEC_STEP_NUM_MIN).max(EXEC_STEP_NUM_MAX).required(),
        description: Joi.string().min(EXEC_STEP_DESC_MIN).max(EXEC_STEP_DESC_MAX).required()
    })
);

/* validator invocation
const { error, value } = recipeIngredientSchema.validate([{
    recipeId: "eds3246356",
    ingredientId: "bd-2423643",
    quantity: 4
}]);

if (!error) return console.log(value);

console.log("ERROR:", error);
*/
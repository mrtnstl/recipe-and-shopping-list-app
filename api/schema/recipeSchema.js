// schemas for recipe object validation(primitives should be validated by validator.js!!)
import Joi from "joi";

const recipeSchema = Joi.object({
    recipeId: Joi.string().required(),
    authorId: Joi.string().required(),
    recipeName: Joi.string().min(1).max(60).required(),
    recipeDescription: Joi.string().min(1).max(140).required(), // TODO: rethink max constraint
    minutesNeeded: Joi.number().min(1).max(32767).required() // max constraint = postgres smallint max value TODO: make it more specific
});
const recipeIngredientSchema = Joi.array().min(1).max(50).items(
    Joi.object({
        recipeId: Joi.string().required(),
        ingredientId: Joi.string().required(),
        quantity: Joi.number().min(1).max(32767).required() // max constraint = postgres smallint max value TODO: make it more specific
    })
);
const executionStepSchema = Joi.array().min(1).max(50).items(
    Joi.object({
        recipeId: Joi.string().required(),
        stepNum: Joi.number().min(1).max(32767).required(), // max constraint = postgres smallint max value TODO: make it more specific
        description: Joi.string().min(1).max(140).required()
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
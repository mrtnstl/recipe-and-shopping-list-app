// schemas for ingredient object validation(primitives should be validated by validator.js!!)
import Joi from "joi";
import { ingredientConstants } from "../constants/schemaConstants.js";
const {
    INGR_NAME_MIN_CHAR,
    INGR_NAME_MAX_CHAR,
    INGR_UNIT_MIN_CHAR,
    INGR_UNIT_MAX_CHAR,
    INGR_TYPE_MAX_CHAR,
    INGR_TYPE_MIN_CHAR
} = ingredientConstants;

export const ingredientSchema = Joi.object({
    ingredientName: Joi.string().min(INGR_NAME_MIN_CHAR).max(INGR_NAME_MAX_CHAR).required(),
    unit: Joi.string().min(INGR_UNIT_MIN_CHAR).max(INGR_UNIT_MAX_CHAR).required(),
    ingredientType: Joi.string().min(INGR_TYPE_MIN_CHAR).max(INGR_TYPE_MAX_CHAR).required()
});
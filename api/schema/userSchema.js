// schemas for user and rbac related object validation(primitives should be validated by validator.js!!)
import Joi from "joi";
import { userConstants } from "../constants/schemaConstants.js";
const {
    USR_NAME_MAX_CHAR,
    USR_NAME_MIN_CHAR,
    USR_SX,
    USR_PW_MIN_L,
    USR_PW_MAX_L
} = userConstants;

const passwordSchema = Joi.string().min(USR_PW_MIN_L).max(USR_PW_MAX_L).custom((value, helpers) => {
    const { error } = helpers;
    if (!/[A-Z]/.test(value)) return error("pw.noUpper");
    if (!/[a-z]/.test(value)) return error("pw.noLower");
    if (!/[0-9]/.test(value)) return error("pw.noNum");
    if (!/[^a-zA-Z0-9]/.test(value)) return error("pw.noSpec");
    return value;
}).messages({
    "pw.noUpper": "Password must contain at least one uppercase letter.",
    "pw.noLower": "Password must contain at least one lowercase letter.",
    "pw.noNum": "Password must contain at least one number.",
    "pw.noSpec": "Password must contain at least one special character.",
});

export const userSchema = Joi.object({
    userName: Joi.string().min(USR_NAME_MIN_CHAR).max(USR_NAME_MAX_CHAR).required(),
    userEmail: Joi.string().email().required(),
    password: passwordSchema,
    userSex: Joi.string().valid(USR_SX.A, USR_SX.B, USR_SX.C).required()
});
export const authSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    password: Joi.string().required()
});
// TODO:
export const roleSchema = Joi.object({});
export const permissionSchema = Joi.object({});

/*
const mockInput = {};
const { error, value } = userSchema.validate(mockInput);

if (!error) console.log(value);

console.log("ERROR:", error);
*/
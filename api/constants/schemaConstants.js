// user constants
export const userConstants = {
    USR_NAME_MAX_CHAR: 30,
    USR_NAME_MIN_CHAR: 2,
    USR_SX: {
        A: "male",
        B: "female",
        C: "other"
    },
    USR_PW_MIN_L: 6,
    USR_PW_MAX_L: 99 // TODO: rethink this
};

// recipe constants
export const recipeConstants = {
    RECIPE_NAME_MIN_CHAR: 1,
    RECIPE_NAME_MAX_CHAR: 60,
    RECIPE_DESC_MIN_CHAR: 1,
    RECIPE_DESC_MAX_CHAR: 140, // TODO: rethink max constraint
    RECIPE_TIME_MIN: 1,
    RECIPE_TIME_MAX: 32767, // max constraint = postgres smallint max value TODO: make it more specific
    REC_ING_QUANT_MIN: 1,
    REC_ING_QUANT_MAX: 32767, // max constraint = postgres smallint max value TODO: make it more specific
    EXEC_STEP_ARRAY_MIN_L: 1,
    EXEC_STEP_ARRAY_MAX_L: 50,
    EXEC_STEP_NUM_MIN: 1,
    EXEC_STEP_NUM_MAX: 32767, // max constraint = postgres smallint max value TODO: make it more specific
    EXEC_STEP_DESC_MIN: 1,
    EXEC_STEP_DESC_MAX: 140
};

// ingredient constants
export const ingredientConstants = {
    INGR_NAME_MIN_CHAR: 1,
    INGR_NAME_MAX_CHAR: 40,
    INGR_UNIT_MIN_CHAR: 1,
    INGR_UNIT_MAX_CHAR: 20,
    INGR_TYPE_MAX_CHAR: 1,
    INGR_TYPE_MIN_CHAR: 20
};
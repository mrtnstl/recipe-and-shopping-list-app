/**
 * input validator and sanitizer utility
 */
import validator from "validator";

class InputValidator {
    isUndefined(input) { return typeof input === "undefined" ? true : false }
    isTruthy(input) { return input ? true : false }
    isFalsy(input) { return !input ? true : false }
    // inclusive comparison
    isStringAndIsLength(input, { min = 1, max = Infinity } = {}) {
        if (typeof input !== "string" || typeof min !== "number" || typeof max !== "number") return false;
        return input.length >= min && input.length <= max;
    }
    // not inclusive comparison
    isIntAndInRange(input, { gt = -Infinity, lt = Infinity } = {}) {
        if (typeof input !== "number" || typeof gt !== "number" || typeof lt !== "number") return false;
        return Number.isInteger(input) && (input > gt && input < lt);
    }
    // TODO: replace validator pkgs simpler methods in the future
    isEmail(input) { return validator.isEmail(input) }
    hasLettersOnly(input) { return validator.isAlpha(input) }
    hasLettersOrNumbersOnly(input) { return validator.isAlphanumeric(input) }
    isEmptyString(input) { return validator.isEmpty(input) }
    isJWT(input) { return validator.isJWT(input) }
}
class InputSanitizer {
    trim(input) { return input.trim() }

}

export default { InputValidator, InputSanitizer }
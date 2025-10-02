import crypto from "node:crypto";

function genIngredientId(name) {
    const base = name[0].toLowerCase() + name[1].toLowerCase();
    const postfix = crypto.randomBytes(8).toString("hex");
    return `${base}-${postfix}`;
}

const ingredientHelpers = { genIngredientId };
export default ingredientHelpers;
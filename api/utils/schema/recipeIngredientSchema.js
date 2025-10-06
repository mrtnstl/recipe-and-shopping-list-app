import SchemaValidator from "./SchemaValidator.js";

const recipeIngredientSchema = new SchemaValidator({
    ingredientId: {
        type: "string",
        canBeNull: false
    },
    quantity: {
        type: "number",
        canBeNull: false
    }
});

recipeIngredientSchema.printAttr();
console.log("\n");

const myObject = {
    ingredientId: "egyediazonosito324324",
    quantity: 3,
};

const result = recipeIngredientSchema.validate(myObject);
console.log(result);
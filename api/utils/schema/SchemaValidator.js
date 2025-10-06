class SchemaValidator {
    constructor(schema) {
        this.schema = schema;
        this.keys = Object.keys(this.schema);
        this.types = this.keys.map(key => this.schema[key].type);
    }
    printAttr() {
        console.log(this.schema)
        console.log(this.keys)
        console.log(this.types)
    }
    checkProperties(object) {
        const objKeys = Object.keys(object);
        if (objKeys.length !== this.keys.length) return true;

        for (let i = 0; i < this.keys.length; i++) {
            if (!Object.hasOwn(object, this.keys[i])) return true;
        }
        return false;
    }
    // this method makes the order of the properties not negligible!
    checkTypes(object) {
        const objKeys = Object.keys(object);

        for (let i = 0; i < this.keys.length; i++) {
            if (typeof object[objKeys[i]] !== this.types[i]) return true;
        }
        return false;
    }
    checkNull(object) {
        // TODO: 
    }

    validate(object) {
        // TODO: validate input
        if (this.checkProperties(object)) { return { error: "Object property mismatch!" } };
        if (this.checkTypes(object)) { return { error: "Object property type mismatch!" } };
        return object;
    }
}

export default SchemaValidator;
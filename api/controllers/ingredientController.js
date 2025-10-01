class IngredientController {
    getIngredients(objectRepository) {
        const { ingredientService } = objectRepository; // TODO: create ingredientService
        return async (req, res) => {
            // TODO: get ingredients in alhabetic order, pagianted
            return true;
        }
    }
    createIngredient(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const { } = req.body;
            // TODO: create new ingredient
            return true;
        }
    }
    getIngredientById(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const { ingredientId } = req.params;
            // TODO: get ingr. by id
            return true;
        }
    }
    searchIngredient(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const { keyword } = req.query.s;
            // TODO: implement search
            return true;
        }
    }
    getCount(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            // TODO: get ingredient count(cache value in future)
            return true;
        }
    }
}
export default new IngredientController();
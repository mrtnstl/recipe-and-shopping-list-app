class IngredientController {
    getIngredients(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            if (typeof limit === "undefined" || typeof page === "undefined") return res.status(400).json({ message: "Malformed request!" });
            if (limit < 0 || limit > 20) return res.status(400).json({ message: "Limit is out of range!" });

            try {
                const ingredients = await ingredientService.getIngredients(objectRepository)(limit, page);
                return res.status(200).json(ingredients);
            } catch (err) {
                console.log(err)
                return res.status(400).json({ message: err.message });
            }
        }
    }
    createIngredients(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const { ingredients } = req.body;
            if (typeof ingredients === "undefined") return res.status(400).json({ message: "Missing request body!" });
            try {
                const newIngredients = await ingredientService.createIngredients(objectRepository)(ingredients);
                return res.status(200).json({ message: "Ingredient(s) created successfully!" });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
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
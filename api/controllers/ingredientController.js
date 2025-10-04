class IngredientController {
    getIngredients(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            if (Number.isNaN(limit) || Number.isNaN(page)) return res.status(400).json({ message: "Malformed request!" });
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
            if (typeof req.body === "undefined" || typeof req.body.ingredients === "undefined")
                return res.status(400).json({ message: "Malformed request!" });
            const { ingredients } = req.body;

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
            if (typeof ingredientId === "undefined") return res.status(400).json({ message: "Malformed request!" }); // TODO: this guard might not be neccessary

            try {
                const ingredient = await ingredientService.getIngredientById(objectRepository)(ingredientId);
                return res.status(200).json(ingredient);
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
    modifyIngredient(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const { ingredientId } = req.params;
            if (typeof req.body === "undefined" || typeof req.body.ingredientData === "undefined")
                return res.status(200).json({ message: "Malformed request!" });
            const { ingredientData } = req.body;

            try {
                const updatedIngredient = await ingredientService.updateIngredient(objectRepository)(ingredientId, ingredientData);
                return res.status(200).json({ message: `Ingredient updated (id: ${updatedIngredient})!` });
            } catch (err) {
                return res.status(200).json({ message: err.message });
            }
        }
    }
    deleteIngredient(objectRepository) {
        const { ingredientService } = objectRepository;
        return async (req, res) => {
            const { ingredientId } = req.params; // TODO: check for undefined? 

            try {
                const deletedIngredient = await ingredientService.deleteIngredient(objectRepository)(ingredientId);
                return res.status(200).json({ message: `Ingredient deleted (id: ${deletedIngredient})!` });
            } catch (err) {
                return res.status(200).json({ message: err.message });
            }
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
            try {
                const ingredientCount = await ingredientService.getCount(objectRepository)();
                return res.status(200).json({ ingredientCount });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
}
export default new IngredientController();
class RecipeController {
    getRecipes(objectRepository) {
        const { recipeService } = objectRepository;
        return async (req, res, next) => {
            const { limit } = req.query;

            let validatedLimit = typeof limit === "undefined" ? 6 : limit;

            try {
                const recipes = await recipeService.getRecipes(objectRepository)(validatedLimit);
                return res.status(200).json(recipes);
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
    getRecipeCount(objectRepository) {
        const { recipeService } = objectRepository;
        return async (req, res, next) => {
            try {
                const recipeCount = await recipeService.getRecipeCount(objectRepository)();
                return res.status(200).json({ recipe_count: recipeCount });
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
    searchRecipe(objectRepository) {
        const { recipeService } = objectRepository;
        return async (req, res, next) => {
            const { keyword } = req.query;

            const serachTerm = keyword || "";

            try {
                const recipes = await recipeService.searchRecipe(objectRepository)(serachTerm);
                return res.status(200).json(recipes);
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
    createRecipe(objectRepository) {
        const { recipeService, recipeSchema } = objectRepository;
        return async (req, res) => {
            const { recipeName, recipeDescription, minutesNeeded } = req.body ?? {};

            if (typeof recipeName === "undefined" ||
                typeof recipeDescription === "undefined" ||
                typeof minutesNeeded === "undefined")
                return res.status(400).json({ message: "Invalid Request!" });

            if (typeof recipeName[0] === "undefined" || typeof recipeName[1] === "undefined")
                return res.status(422).json({ message: "Invalid Request" });

            const recipeId = recipeName[0].toLowerCase() + recipeName[1].toLowerCase() + Math.floor((Math.random() * 100000));

            const authorId = "ma6666";// TODO: authorId = req.user.id;

            const { error } = recipeSchema.validate({
                recipeId,
                authorId,
                recipeName,
                recipeDescription,
                minutesNeeded
            });
            if (error) return res.status(422).json({ message: error.message });

            // TODO: pass object instead of array
            const data = [recipeId, recipeName, authorId, recipeDescription, minutesNeeded];

            try {
                const newRecipe = await recipeService.newRecipe(objectRepository)(data);
                return res.status(200).json({ message: "Success", recipeId: newRecipe });
            } catch (err) {
                console.log(err);
                return res.status(400).json({ message: err.message });
            }
        }
    }
    getRecipeById(objectRepository) {
        const { recipeService } = objectRepository;
        return async (req, res) => {
            const { recipeId } = req.params;
            if (typeof recipeId === "undefined") return res.status(400).json({ message: "Invalid request!" });

            try {
                const recipe = await recipeService.getRecipeById(objectRepository)(recipeId);
                return res.status(200).json({ recipe });
            } catch (err) {
                console.log(err);
                return res.send(400).json({ message: err.message });
            }
        }
    }
    // TODO: anonimize recipe(soft delete recipe) and delete recipe method
}
export default new RecipeController();
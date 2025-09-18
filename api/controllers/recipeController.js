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
                console.log(recipes)
                return res.status(200).json(recipes);
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
    createRecipe(objectRepository) {
        const { recipeService } = objectRepository;
        return async (req, res) => {
            const { recipeName, recipeDescription, minutesNeeded } = req.body;
            if (typeof recipeName === "undefined" || typeof recipeDescription === "undefined" || typeof minutesNeeded === "undefined") return res.send(400).json({ message: "Missing Crutial Recipe Data!" });

            const recipeId = recipeName[0].toLowerCase() + recipeName[1].toLowerCase() + Math.floor((Math.random() * 100000));

            const authorId = "ma6666";// TODO: authorId = req.user.id;

            const data = [recipeId, recipeName, authorId, recipeDescription, minutesNeeded];

            try {
                const newRecipe = await recipeService.newRecipe(objectRepository)(data);
                return res.status(200).json({ message: "Success", recipeId: newRecipe });
            } catch (err) {
                console.log(err)
                return res.status(400).json({ message: err.message })
            }
        }
    }
    createRecipeIngredients(objectRepository) {
        return async (req, res) => { }
    }
    createExecutionSteps(objectRepository) {
        return async (req, res) => { }
    }

}
export default new RecipeController();
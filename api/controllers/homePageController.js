// TODO: get recipe count and top 6 recipes for homepage here
class HomePageController {
    getPageData(objectRepository) {
        const { recipeService } = objectRepository;
        return async (req, res) => {
            const { limit } = req.query;

            try {
                const recipeCount = await recipeService.getRecipeCount(objectRepository)();

                let validatedLimit = typeof limit === "undefined" ? 6 : limit;
                const recipes = await recipeService.getRecipes(objectRepository)(validatedLimit);

                return res.status(200).json({ recipe_count: recipeCount, recipes });
            } catch (err) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
}
export default new HomePageController();
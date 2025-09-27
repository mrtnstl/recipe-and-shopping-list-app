class ChefsPageController {
    getPageData(objectRepository) {
        const { userService, recipeService } = objectRepository;
        return async (req, res) => {
            const { userId } = req.params;
            if (typeof userId === "undefined") return res.status(400).json({ message: "Invalid request!" });

            try {
                const { id, user_name, user_handle, user_email, user_sex, profile_pic } = await userService.getUserById(objectRepository)(userId);
                const selectedChef = { id, user_name, user_handle, user_email, user_sex, profile_pic };
                const authoredRecipes = await recipeService.getRecipeByAuthorId(objectRepository)(userId);

                const result = { chefData: selectedChef, recipes: authoredRecipes };

                return res.status(200).json(result);
            } catch (err) {
                // TODO: change err message to something generic, log real error to file  
                return res.status(400).json({ message: err.message });
            }
        }
    }

}
export default new ChefsPageController();
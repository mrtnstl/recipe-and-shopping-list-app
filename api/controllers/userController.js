const userController = {
    register: (objectRepository) => {
        const { userService } = objectRepository;
        return async (req, res, next) => {
            const { userName, userEmail, password, userSex } = req.body;
            try {
                const user = await userService.createUser(objectRepository)(userName, userEmail, password, userSex);
                return res.status(200).json(user);
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
    getUser: (objectRepository) => {
        const { userService } = objectRepository;
        return async (req, res, next) => {
            const { userId } = req.params;
            try {
                const user = await userService.getUserById(userId);
                return res.status(200).json(user);
            } catch (err) {
                const statusCode = err.statusCode || 400;
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
};
export default userController;
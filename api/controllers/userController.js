const userController = {
    register: (objectRepository) => {
        const { userService, userSchema } = objectRepository;
        return async (req, res, next) => {
            const { userName, userEmail, password, userSex } = req.body;

            if (typeof userName === "undefined" ||
                typeof userEmail === "undefined" ||
                typeof password === "undefined" ||
                typeof userSex === "undefined")
                return res.status(400).json({ message: "Missing parameter(s)!" });

            const { error } = userSchema.validate({ userName, userEmail, password, userSex });
            if (error) return res.status(422).json({ message: error.message });

            try {
                const newUser = await userService.createUser(objectRepository)(userName, userEmail, password, userSex);
                return res.status(200).json({ message: "success" });
            } catch (err) {
                const statusCode = err.statusCode || 400; // TODO: custom errors 
                return res.status(statusCode).json({ message: err.message });
            }
        }
    },
    getUser: (objectRepository) => {
        const { userService } = objectRepository;
        return async (req, res, next) => {
            const { userId } = req.params;

            if (typeof userId === "undefined") return res.status(400).json({ message: "Missing parameter!" });

            try {
                const user = await userService.getUserById(objectRepository)(userId);
                return res.status(200).json(user);
            } catch (err) {
                const statusCode = err.statusCode || 400; // TODO: custom errors
                return res.status(statusCode).json({ message: err.message });
            }
        }
    }
};
export default userController;
//import services and helpers here
import Users from "../repositories/userRepository.js";

const userController = {
    register: async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const user = await Users.insert(username, password);
            return res.status(200).json(user);
        } catch (err) {
            const statusCode = err.statusCode || 400;
            return res.status(statusCode).json({ message: err.message });
        }
    },
    getUser: async (req, res, next) => {
        const { userId } = req.params;
        try {
            const user = await Users.findById(userId);
            return res.status(200).json(user);
        } catch (err) {
            const statusCode = err.statusCode || 400;
            return res.status(statusCode).json({ message: err.message });
        }
    }
}

export default userController;
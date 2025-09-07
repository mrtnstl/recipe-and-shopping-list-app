//import services and helpers here

// USER SERVICE
import Users from "../repositories/userRepository.js";

const userController = {

    register: async (req, res, next) => {
        const { username, password } = req.body;
        const user = await Users.insert(username, password);
        console.log(user)
        return res.status(200).json(user)
    },
    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await Users.findById(userId);

        return res.status(200).json(user);
    }

}
export default userController;
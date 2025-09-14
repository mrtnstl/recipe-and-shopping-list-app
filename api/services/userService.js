import { genSalt, hash } from "bcrypt";
import Users from "../repositories/userRepository.js";
import { generateUserHandle, generateUserId } from "../utils/userHelpers.js";
const userService = {
    createUser: (objectRepository) => {
        const { Users } = objectRepository;
        return async (userName, userEmail, password, userSex) => {

            const userId = generateUserId(); // postgres should generate this uuid!!!

            const userHandle = generateUserHandle(userName);
            const profilePic = "";

            const passwordSalt = await genSalt(8);
            const passwordHash = await hash(password, passwordSalt);


            const newUser = [userName, userHandle, userEmail, userSex, passwordHash, passwordSalt];
            console.log(newUser)
            const user = await Users.insert(objectRepository)(newUser);
            return user;
        }
    },
    checkUserCredentials: (objectRepository) => {
        const { pool } = objectRepository;
        return async (userEmail, password) => {
            const user = await pool.query("SELECT id, user_name, user_handle, user_email FROM users WHERE user_email = $1", [userEmail]);
            // hash and compare supplied pw with pw_hash

        }
    },
    getUserById: async (userId) => {
        const user = await Users.findById(userId);
        return user;
    }
};

export default userService;
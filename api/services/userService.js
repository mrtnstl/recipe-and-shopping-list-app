import { genSalt, hash } from "bcrypt";

const userService = {
    createUser: (objectRepository) => {
        const { Users, userHelpers } = objectRepository;
        return async (userName, userEmail, password, userSex) => {

            const userId = userHelpers.generateUserId(); // postgres should generate this uuid!!!

            const userHandle = userHelpers.generateUserHandle(userName);
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
    getUserById: (objectRepository) => {
        const { Users } = objectRepository;
        return async (userId) => {
            const user = await Users.findById(userId);
            return user;
        }
    }
};

export default userService;
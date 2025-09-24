const Users = {
    getUserByEmail: (objectRepository) => {
        const { pool } = objectRepository;
        return async (userEmail) => {
            try {
                const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [userEmail]);
                return user.rows[0];
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    findById: (objectRepository) => {
        const { pool } = objectRepository;
        return async (userId) => {
            try {
                const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
                return user.rows[0];
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    insert: (objectRepository) => {
        const { pool } = objectRepository;
        return async (dataArray) => {
            try {
                const insertNewUser = await pool.query("INSERT INTO users(user_name, user_handle, user_email, user_sex, pw_hash, pw_salt) VALUES($1, $2, $3, $4, $5, $6)", dataArray);
                return insertNewUser;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    update: () => { }
}

export default Users;
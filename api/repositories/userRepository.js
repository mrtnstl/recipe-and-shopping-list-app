const users = [
    { id: "1", name: "john", password: "John123", isAdmin: true },
    { id: "2", name: "jane", password: "Jane123", isAdmin: false },
];

const Users = {
    findOne: (username, password) => {
        return new Promise((resolve, reject) => {
            resolve(users.find(u => { return u.name === username && u.password === password ? u : null }));
        });
    },
    findById: (userId) => {
        return new Promise((resolve, reject) => {
            resolve(users.find(u => u.id === userId ? u : null));
        });
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
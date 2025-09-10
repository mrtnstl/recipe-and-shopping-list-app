const users = [
    { id: "1", name: "john", password: "John123", isAdmin: true },
    { id: "2", name: "jane", password: "Jane123", isAdmin: false },
];
const getLastId = () => {
    const ids = users.map(user => { return user.id });
    return ids.length;
};

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
    insert: (name, password) => {
        return new Promise((resolve, reject) => {
            const userId = String(getLastId() + 1);
            const newUser = { id: userId, name: name, password: password, isAdmin: false };
            users.push(newUser);
            resolve(newUser);
        });
    },
    update: () => { }
}

export default Users;
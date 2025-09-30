export const login = async ({ userEmail, userPassword }) => {
    try {
        const payload = { userEmail: userEmail, password: userPassword };
        const response = await fetch("http://localhost:5000/api/login", {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) throw data.message;
        return data;
    } catch (err) { throw err }
}

export const logout = async (user, setUser) => {
    const { accessToken, refreshToken } = user;
    try {
        const response = await fetch("http://localhost:5000/api/logout", {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ token: refreshToken })
        });
        const data = await response.json();
        if (!response.ok) throw data.message;
        return setUser("");
        //return data;
    } catch (err) { throw err }

}
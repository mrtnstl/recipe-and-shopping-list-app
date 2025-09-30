import { useState } from "react";

const RegisterForm = () => {
    const [userData, setUserData] = useState({ userName: "", userEmail: "", password: "", userSex: "" });
    const [regError, setRegError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegError("");
        const userDataArray = Object.values(userData);
        if (userDataArray.some(data => data === "")) { // TODO: input validation!
            return console.log("Filling all input fields is required!")
        }
        await fetch("http://localhost:5000/api/register", {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(result => result.json())
            .then(response => {
                console.log(response);
                setUserData({ userName: "", userEmail: "", password: "", userSex: "" });
            }) // TODO: log in after registration
            .catch((err) => setRegError(err));
    }
    return (
        <form onSubmit={e => handleSubmit(e)} className='border flex flex-col rounded-xl p-4'> {/* TODO: make the forms work first, apply design later */}
            <p className='font-bold'>RegisterForm</p>
            <label htmlFor="userName">userName</label>
            <input type="text" name="userName" id="userName"
                value={userData.userName} onChange={e => setUserData({ ...userData, userName: e.target.value })} />
            <label htmlFor="userEmail">userEmail</label>
            <input type="text" name="userEmail" id="userEmail"
                value={userData.userEmail} onChange={e => setUserData({ ...userData, userEmail: e.target.value })} />
            <label htmlFor="password">password</label>
            <input type="text" name="password" id="password"
                value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
            <label htmlFor="userSex">userSex</label>
            <input type="radio" name="userSex" id="userSex1"
                checked={userData.userSex === "male"} value={"male"} onChange={e => setUserData({ ...userData, userSex: e.target.value })} />
            <input type="radio" name="userSex" id="userSex2"
                checked={userData.userSex === "female"} value={"female"} onChange={e => setUserData({ ...userData, userSex: e.target.value })} />
            <input type="radio" name="userSex" id="userSex3"
                checked={userData.userSex === "other"} value={"other"} onChange={e => setUserData({ ...userData, userSex: e.target.value })} />
            <button type="submit" className='border rounded-full'>REGISTER</button>
            {regError && <p className="font-bold text-red-500">{regError}</p>}
        </form>
    )
}

export default RegisterForm;
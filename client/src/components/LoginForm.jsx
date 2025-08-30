import { useState } from 'react';
import { login, logout } from "../services/auth.js";
import { useAuth } from '../contexts/AuthContext.jsx';

const LoginForm = () => {
    const { user, setUser } = useAuth();
    const [loginData, setLoginData] = useState({ userName: "", userPassword: "" });
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);
        try {
            const loginResult = await login(loginData);
            return setUser(loginResult);
        } catch (err) { return setError("Sikertelen bejelentkezési kísérlet!") };
    }

    return <form onSubmit={handleSubmit} className='border flex flex-col rounded-xl p-4'>
        <span className='font-bold'>Log In</span>
        <input type="text" placeholder='username' onChange={e => setLoginData({ ...loginData, userName: e.target.value })}
            className='italic'
        />
        <input type="password" placeholder='password' onChange={e => setLoginData({ ...loginData, userPassword: e.target.value })}
            className='italic'
        />
        <button type="submit" className='border rounded-full '>Login</button>
        <span>{loginData.userName}, {loginData.userPassword}</span>
        {error && <p className='font-bold text-red-500'>{error}</p>}
    </form>
}
export default LoginForm;
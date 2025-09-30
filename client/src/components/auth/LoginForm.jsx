import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from "../../services/auth.js";
import { useAuth } from '../../contexts/AuthContext.jsx';

const LoginForm = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ userEmail: "", userPassword: "" });
    const [error, setError] = useState(false);

    if (user) return navigate("/");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);
        try {
            const loginResult = await login(loginData);
            setUser(loginResult);
            return (() => {
                navigate("/");
            })();
        } catch (err) {
            return setError(err);
        };
    }

    return (
        <form onSubmit={handleSubmit} className='border flex flex-col rounded-xl p-4'>
            <p className='font-bold'>Log In</p>
            <input type="text" placeholder='userEmail' onChange={e => setLoginData({ ...loginData, userEmail: e.target.value })}
                className='italic'
            />
            <input type="password" placeholder='password' onChange={e => setLoginData({ ...loginData, userPassword: e.target.value })}
                className='italic'
            />
            <button type="submit" className='border rounded-full'>LOGIN</button>
            <span>{loginData.userEmail}, {loginData.userPassword}</span>
            {error && <p className='font-bold text-red-500'>{error}</p>}
            <Link to={"/forgot-password"}>Forgot Password</Link>
        </form>
    )
}
export default LoginForm;
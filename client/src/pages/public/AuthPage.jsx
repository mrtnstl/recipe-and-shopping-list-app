import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/register/RegisterForm";


const AuthPage = () => {
    return (
        <section className="max-w-[1200px] self-center flex-1 font-brutal ">
            <div className="">
                <button>Login</button>
                <button>Register</button>

                <LoginForm />
                <RegisterForm />


            </div>

        </section>
    )
}

export default AuthPage;
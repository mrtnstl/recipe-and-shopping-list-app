import ForgotPasswordPage from "../pages/public/ForgotPasswordPage";
import { Outlet } from "react-router-dom";

const ForgotPasswordLayout = () => {
    return (
        <div className="max-w-[1200px] self-center flex-1 font-brutal ">
            <ForgotPasswordPage />
            <Outlet />
        </div>
    )
}

export default ForgotPasswordLayout;
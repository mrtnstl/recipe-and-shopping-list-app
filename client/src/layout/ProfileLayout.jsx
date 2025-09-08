import ProfilePage from "../pages/ProfilePage";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
    return (
        <div className="max-w-[1200px] self-center flex-1 font-brutal ">
            <ProfilePage />
            <Outlet />
        </div>
    )
}

export default ProfileLayout;
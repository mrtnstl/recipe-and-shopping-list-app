import { NavLink, useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

    return (

        <div className="border-2 p-3 flex max-w-[700px] gap-5 font-bold shadow-[3px_3px_0_black]">
            <button className="drop-shadow-[1px_1px_0_var(--color-customRed)]"
                onClick={() => navigate("")}>
                My Profile
            </button>
            <button className="drop-shadow-[1px_1px_0_var(--color-customRed)]"
                onClick={() => navigate("recipes")}>
                My Recipes
            </button>
            <button className="drop-shadow-[1px_1px_0_var(--color-customRed)]"
                onClick={() => navigate("fridge")}>
                My Fridge
            </button>
            <button className="drop-shadow-[1px_1px_0_var(--color-customRed)]"
                onClick={() => navigate("shopping-lists")}>
                My Shopping Lists
            </button>
            <button className="drop-shadow-[1px_1px_0_var(--color-customRed)]"
                onClick={() => navigate("cooked")}>
                What I Already Cooked
            </button>
        </div>

    )
}

export default ProfilePage;
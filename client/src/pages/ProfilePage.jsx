import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    return (
        <section>
            ProfilePage
            <div>
                <button onClick={() => navigate("")}>
                    My Profile
                </button>
                <button onClick={() => navigate("recipes")}>
                    My Recipes
                </button>
            </div>
        </section>
    )
}

export default ProfilePage;
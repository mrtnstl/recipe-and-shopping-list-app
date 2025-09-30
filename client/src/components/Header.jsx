import { useState } from "react";
import { MenuIcon } from "../assets/icons/SVGIcons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { logout } from "../services/auth";

const Header = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [menuIsActive, setMenuIsActive] = useState(false);
    const toggleMenu = () => setMenuIsActive(prev => !prev);

    return <header className="w-full max-w-[1200px] self-center flex flex-none items-center justify-between">
        <h1 className="ml-3 text-2xl font-bold stroke-2 text-stroke-green-300 text-fill-amber-300 cursor-pointer"
            onClick={() => navigate("/", { replace: true })}>LOGO</h1>
        {/*<ul className="w-[200px] flex justify-between">
            <NavLink to={"/"}><li>Home</li></NavLink>
            <NavLink to={"/recipes"}><li>Recipes</li></NavLink>
            <NavLink to={"/profile"}><li>Profile</li></NavLink>
        </ul>*/}
        <button
            className="mt-1 mr-3 p-1 cursor-pointer rounded relative">
            <MenuIcon menuIsActive={menuIsActive} onClick={toggleMenu} />
            {
                menuIsActive && <div className="absolute p-4 text-lg font-bold border-2 right-0 mt-2 shadow-[2px_2px_0_black] bg-customYellow">
                    <ul>
                        <li onClick={() => {
                            navigate("/");
                            toggleMenu();
                        }}>
                            Home
                        </li>
                        <li onClick={() => {
                            navigate("/profile");
                            toggleMenu();
                        }}>
                            Profile
                        </li>
                        <li onClick={() => {
                            navigate("/recipes");
                            toggleMenu();
                        }}>
                            Recipes
                        </li>
                        <li>
                            Shopping Lists
                        </li>
                        {
                            user ? (
                                <li onClick={() => {
                                    logout(user, setUser);
                                    toggleMenu();
                                }}>
                                    LogOut
                                </li>
                            ) : (
                                <li onClick={() => {
                                    navigate("/login");
                                    toggleMenu();
                                }}>
                                    LogIn
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
        </button>
    </header>
}
export default Header;
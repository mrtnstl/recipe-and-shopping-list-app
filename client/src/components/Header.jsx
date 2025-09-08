import { MenuIcon } from "../assets/icons/SVGIcons";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();

    return <header className="w-full max-w-[1200px] self-center flex flex-none items-center justify-between">
        <h1 className="ml-3 text-2xl font-bold stroke-2 text-stroke-green-300 text-fill-amber-300 cursor-pointer"
            onClick={() => navigate("/", { replace: true })}>LOGO</h1>
        <ul className="w-[200px] flex justify-between">
            <NavLink to={"/"}><li>Home</li></NavLink>
            <NavLink to={"/recipes"}><li>Recipes</li></NavLink>
            <NavLink to={"/profile"}><li>Profile</li></NavLink>
        </ul>
        <button id="menuIcon-warpper"
            className="mt-1 mr-3 p-1 cursor-pointer rounded drop-shadow-xl drop-shadow-transparent hover:drop-shadow-customYellow focus-within:drop-shadow-customYellow">
            <MenuIcon onClick={() => navigate("/chef/1")} />
        </button>
    </header>
}
export default Header;
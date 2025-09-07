import { MenuIcon } from "../assets/icons/SVGIcons"
const Header = () => {

    return <header className="w-full max-w-[1200px] self-center flex flex-none items-center justify-between">
        <h1 className="ml-3 text-2xl font-bold stroke-2 text-stroke-green-300 text-fill-amber-300">LOGO</h1>

        <span id="menuIcon-warpper" className="mr-3 p-2">
            <MenuIcon onClick={() => { console.log("menu clicked") }} />
        </span>
    </header>
}
export default Header;
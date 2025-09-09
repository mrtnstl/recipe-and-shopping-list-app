import { Link } from "react-router-dom";
const Footer = () => {
    return <footer className="py-4 w-full max-w-[1200px] self-center flex flex-col md:flex-row items-center justify-around bg-customGray text-customBeige">
        <div className="py-2 w-full text-center font-bold text-4xl"><Link to={"/"}>LOGO</Link></div>
        <div className="py-2 w-full flex flex-col sm:flex-row sm: text-center ">
            <div className="py-1 flex-1">
                <p>home</p>
                <p>recipes</p>
                <p>statistics</p>
                <p>other</p>
            </div>
            <div className="py-1 flex-1">
                <p>link1</p>
                <p>link2</p>
            </div>
        </div>
    </footer>
}
export default Footer;
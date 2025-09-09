import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <section className="max-w-[1200px] self-center flex-1 font-brutal ">
            <h1>404</h1>
            <button onClick={() => navigate("/")}>Go Back Home</button>
        </section>
    )
}
export default NotFound;
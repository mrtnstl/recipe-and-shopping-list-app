import { useState, useEffect } from "react";
import { SearchIcon } from "../../assets/icons/SVGIcons";

const RecipesPage = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [filters, setFilters] = useState({});

    const executeSearch = async (keyword) => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const searchResult = await fetch(`${apiUrl}/api/recipe/search?keyword=${keyword}`, {
                mode: "cors",
                headers: { "Content-Type": "application/json" }
            });
            if (!searchResult.ok) { return console.log("fetch response err") }
            const result = await searchResult.json();

            setSearchResult(result);
            return result;
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        executeSearch(keyword);
    }, []);
    return (
        <section className="max-w-[1200px] self-center flex-1 font-brutal ">
            <h1>RecipesPage</h1>
            <div>

                <div className='flex flex-col items-center '>
                    <form onSubmit={e => {
                        e.preventDefault();
                        executeSearch(keyword);
                    }} className='p-2 my-2'>
                        <span className="border-2 shadow-[2px_2px_0_black] p-2 rounded-xl bg-customBeige">
                            <label htmlFor="searchRecipe" className='mr-2' onClick={() => executeSearch(keyword)}>
                                <SearchIcon />
                            </label>
                            <input name="searchRecipe" id="searchRecipe" placeholder="Search For Your Fave" type="text"
                                onChange={e => setKeyword(e.target.value)} />
                        </span>
                    </form>
                </div>
                <div>
                    <form onSubmit={e => e.preventDefault()}>
                        <label title={"search(keyword in title or description or user_name or user_handle)," +
                            " filters(minutes_needed, execution_steps count, gastro_preference_types, recipe_ratings," +
                            " favorite_recipes, cooked_recipes)"}>
                            filters
                        </label>
                    </form>
                </div>
            </div>
            <div className='my-5'>
                <h2 className='mx-3 font-bold text-lg'>Hits</h2>
                <div className='mx-1 justify-center grid grid-rows-6 sm:grid-rows-3 sm:grid-cols-2 gap-x-2 gap-y-2'>

                    {searchResult.length > 0 && searchResult.map(recipe => (
                        <div key={recipe.id} className='flex flex-col border-2 shadow-[4px_4px_0_black] p-2 bg-customYellow text-customGray w-[300px]'>
                            <h3 className=' text-lg font-bold'>{recipe.title}</h3>
                            <p className=' grow-1'>{recipe.description}</p>
                            <p className='self-end'>Ready in {recipe.minutes_needed} minutes</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default RecipesPage;
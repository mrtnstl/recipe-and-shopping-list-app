import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/search/SearchBar";
import RecipeCard from "../../components/recipe/RecipeCard";

const RecipesPage = () => {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [filters, setFilters] = useState({});

    const executeSearch = useCallback(async (keyword) => {
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
    });
    useEffect(() => {
        executeSearch(keyword);
    }, []);
    return (
        <section className="max-w-[1200px] self-center flex-1 font-brutal ">
            <h1>RecipesPage</h1>
            <div>
                <div className='flex flex-col items-center '>
                    <SearchBar submitHandler={executeSearch} action={"simpleSearch"} />
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
                        <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title}
                            description={recipe.description} minutesNeeded={recipe.minutes_needed} navigate={navigate} />

                    ))}
                </div>
            </div>
        </section>
    )
}
export default RecipesPage;
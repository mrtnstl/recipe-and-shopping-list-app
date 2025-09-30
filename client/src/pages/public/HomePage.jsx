import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../components/search/SearchBar.jsx';
import RecipeCard from '../../components/recipe/RecipeCard.jsx';

const HomePage = () => {
    const [recipeCount, setRecipeCount] = useState("0");
    const [topRecipes, setTopRecipes] = useState([]);
    const navigate = useNavigate();

    const fetchRecipeCount = async () => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const recipeCountFetch = await fetch(`${apiUrl}/api/recipe/count`, {
                mode: "cors",
                headers: { "Content-Type": "application/json" }
            });
            const result = await recipeCountFetch.json();
            if (!recipeCountFetch.ok) { return console.log("fetch response err") };

            setRecipeCount(result.recipe_count);
            return result;
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchRecipeCount();
        //setRecipeCount(recipe_count);
    }, []);

    const fetchTopRecipes = useCallback(async () => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const topRecipesFetch = await fetch(`${apiUrl}/api/recipe?limit=6`, {
                mode: "cors",
                headers: { "Content-Type": "application/json" }
            });
            if (!topRecipesFetch.ok) { return console.log("fetch response err") }
            const result = await topRecipesFetch.json();

            setTopRecipes(result);
            return result;
        } catch (err) {
            console.log(err)
        }
    });
    useEffect(() => {
        fetchTopRecipes();
        //setTopRecipes(topRecipes);
    }, []);
    return (
        <section className='max-w-[1200px] self-center flex-1 font-brutal '>
            <section className='my-5 font-bold flex flex-col items-center'>
                <p className='text-xl mx-3'>Find quick instructions for your favorite dishes</p>
                <p className=' mx-3'>and create shopping lists based on them, to be sure to have everithing for the oven</p>
                <div className='flex flex-col items-center '>
                    <SearchBar submitHandler={navigate} action={"redirectAndSearch"} />
                    <p className='my-0.5'>or</p>
                    <button
                        className='w-fit align-middle border-2 shadow-[2px_2px_0_black] p-2 my-2 rounded-xl bg-customRed cursor-pointer'
                        onClick={() => navigate("create-recipe")}>Create A Recipe</button>
                </div>
            </section>
            <section className='my-5'>
                <h2 className='mx-3 font-bold text-lg'>Latest 6 out of {recipeCount} Dishes</h2>
                <div className='mx-1 justify-center grid grid-rows-6 sm:grid-rows-3 sm:grid-cols-2 gap-x-2 gap-y-2'>
                    {topRecipes.length > 0 && topRecipes.map(recipe => (
                        <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title}
                            description={recipe.description} minutesNeeded={recipe.minutes_needed} navigate={navigate} />
                    ))}
                </div>
            </section>
        </section>
    )
}
export default HomePage;
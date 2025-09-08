import { useEffect, useState } from 'react';
import { SearchIcon } from "../assets/icons/SVGIcons.jsx";


import heroImg from "../assets/images/clay-banks-hwLAI5lRhdM-unsplash.jpg";

const HomePage = () => {
    const [recipeCount, setRecipeCount] = useState("0");
    const [topRecipes, setTopRecipes] = useState([]);


    const fetchRecipeCount = async () => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const recipeCountFetch = await fetch(`${apiUrl}/api/recipe/count`, {
                mode: "cors",
                headers: { "Content-Type": "application/json" }
            });
            const result = await recipeCountFetch.json();
            if (!recipeCountFetch.ok) { return console.log("fetch response err") };
            console.log(result.recipe_count)
            setRecipeCount(result.recipe_count);
            return result;
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        const { recipe_count } = fetchRecipeCount();
        setRecipeCount(recipe_count);
    }, []);

    const fetchTopRecipes = async () => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
            const topRecipesFetch = await fetch(`${apiUrl}/api/recipe?limit=6`, {
                mode: "cors",
                headers: { "Content-Type": "application/json" }
            });
            if (!topRecipesFetch.ok) { return console.log("fetch response err") }
            const result = await topRecipesFetch.json();
            console.log(result[0].title)
            setTopRecipes(result);
            return result;
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const topRecipes = fetchTopRecipes();
        setTopRecipes(topRecipes);
    }, [])
    return (
        <section className='max-w-[1200px] self-center flex-1 font-brutal '>
            <section className='my-5 font-bold flex flex-col items-center'>
                <p className='text-xl mx-3'>Find quick instructions for your favorite dishes</p>
                <p className=' mx-3'>and create shopping lists based on them, to be sure to have everithing for the oven</p>

                {/*<img src={heroImg} alt="heroimage" width={300} className='w-[600px] rounded-2xl' />*/}
                <div className='flex flex-col items-center '>
                    <form action="" className='p-2 my-2'>
                        <span className="border-2 shadow-[2px_2px_0_black] p-2 rounded-xl bg-customBeige">
                            <label htmlFor="searchRecipe" className='mr-2' onClick={() => alert("searching recipe...")}>
                                <SearchIcon />
                            </label>
                            <input name="searchRecipe" id="searchRecipe" placeholder="Search For Yout Fave" type="text" />
                        </span>
                    </form>
                    <p className='my-0.5'>or</p>
                    <button
                        className='w-fit align-middle border-2 shadow-[2px_2px_0_black] p-2 my-2 rounded-xl bg-customRed cursor-pointer'
                        onClick={() => alert("Create Recipe")}>Create A Recipe</button>
                </div>
            </section>
            <section className='my-5'>
                <h2 className='mx-3 font-bold text-lg'>Top 6 out of {recipeCount} Dishes <span className='text-sm'>Based On Cooking Frequency</span></h2>
                <div className='mx-1 justify-center grid grid-rows-6 sm:grid-rows-3 sm:grid-cols-2 gap-x-2 gap-y-2'>

                    {topRecipes.length > 0 && topRecipes.map(recipe => (
                        <div key={recipe.id} className='flex flex-col border-2 shadow-[4px_4px_0_black] p-2 bg-customYellow text-customGray w-[300px]'>
                            <h3 className=' text-lg font-bold'>{recipe.title}</h3>
                            <p className=' grow-1'>{recipe.description}</p>
                            <p className='self-end'>Ready in {recipe.minutes_needed} minutes</p>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}
export default HomePage;
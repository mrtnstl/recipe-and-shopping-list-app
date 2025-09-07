import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import heroImg from "./assets/images/clay-banks-hwLAI5lRhdM-unsplash.jpg"

import { fetchWithRetry } from "./utils/fetchWithAutoRefreshToken.js";
import LoginForm from './components/LoginForm.jsx';
import { logout } from './services/auth.js';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
  const { user, setUser } = useAuth();
  const [recipeCount, setRecipeCount] = useState("0");
  const [topRecipes, setTopRecipes] = useState([]);


  const fetchRecipeCount = async () => {
    try {
      const recipeCountFetch = await fetch("http://localhost:5000/api/recipe/count", {
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
      const topRecipesFetch = await fetch("http://localhost:5000/api/recipe?limit=6", {
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
    <div className='flex flex-col  bg-customLightGreen min-h-screen text-customGray '>
      <Header />
      <main className='max-w-[1200px] self-center flex-1 font-brutal '>
        <section className='font-bold flex flex-col items-center'>
          <p className='text-xl mx-3'>Find quick instructions for your favorite dishes</p>
          <p className=' mx-3'>and create shopping lists based on them, to be sure to have everithing for the oven</p>
          <p className=' mx-3'>Explore amongst our {recipeCount} recipes, shared by food enthusiasts, just like yourself!</p>
          {/*<img src={heroImg} alt="heroimage" width={300} className='w-[600px] rounded-2xl' />*/}
          <div className='flex flex-col items-center '>
            <form action="" className='p-2 my-2'>
              <span className="border-2 shadow-[2px_2px_0_black]  p-2  rounded-xl bg-customBeige">
                <label htmlFor="searchRecipe" className='mx-1'>S</label>
                <input name="searchRecipe" id="searchRecipe" placeholder="Search For Yout Fave" type="text" />
              </span>
            </form>
            <p className='my-0.5'>or</p>
            <button className='w-fit align-middle border-2 shadow-[2px_2px_0_black] p-2 my-2 rounded-xl bg-customRed cursor-pointer'>Create A Recipe</button>
          </div>
        </section>
        <section>
          <h2 className='font-bold text-lg'>Top 6 Dishes Based On Cooking Frequency</h2>
          <div className=' justify-center grid grid-rows-6 sm:grid-rows-3 sm:grid-cols-2 gap-x-2 gap-y-2'>

            {topRecipes.length > 0 && topRecipes.map(recipe => (
              <div key={recipe.id} className='flex flex-col border-2 shadow-[4px_4px_0_black] p-2 bg-customYellow text-customGray w-[300px]'>
                <h3 className=' text-lg font-bold'>{recipe.title}</h3>
                <p className=' grow-1'>{recipe.description}</p>
                <p className='self-end'>Ready in {recipe.minutes_needed} minutes</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App

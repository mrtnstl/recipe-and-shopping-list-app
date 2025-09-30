import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipePage = () => {
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState({});

    useEffect(() => {

    }, [])
    return (
        <div>RecipePage {recipeId}</div>
    )
}

export default RecipePage;
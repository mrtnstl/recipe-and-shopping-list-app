import { useState } from "react"

const CreateRecipeForm = () => {
    const [newRecipe, setNewRecipe] = useState({ recipeName: "", recipeDescription: "", minutesNeeded: 0 });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        const recipeValuesArray = Object.values(newRecipe);
        if (recipeValuesArray.some(item => item === "") || newRecipe.minutesNeeded === 0) {// TODO: proper input validation
            return setErrorMessage("Incomplete Recipe Info!");
        }
        await fetch("http://localhost:5000/api/recipe", {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe)
        })
            .then(result => result.json())
            .then(response => {
                setSuccessMessage("Yayy!");
                setNewRecipe({ recipeName: "", recipeDescription: "", minutesNeeded: 0 });
            })
            .catch(err => setErrorMessage(err));
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>Create Recipe</p>
            <label htmlFor="recipeName">Name</label>
            <input type="text" name="recipeName" id="recipeName" placeholder="Pineapple Pizza"
                value={newRecipe.recipeName} onChange={e => setNewRecipe({ ...newRecipe, recipeName: e.target.value })} />
            <label htmlFor="recipeDescription">Description</label>
            <textarea name="recipeDescription" id="recipeDescription" placeholder="Some Brief Info About The Food"
                value={newRecipe.recipeDescription} onChange={e => setNewRecipe({ ...newRecipe, recipeDescription: e.target.value })} />
            <label htmlFor="minutesNeeded">how many minutes til its done?</label>
            <input type="number" name="minutesNeeded" id="minutesNeeded" placeholder="..."
                value={newRecipe.minutesNeeded} onChange={e => setNewRecipe({ ...newRecipe, minutesNeeded: e.target.value })} />
            <button type="submit">CREATE</button>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    )
}

export default CreateRecipeForm
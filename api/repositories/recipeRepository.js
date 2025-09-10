const recipes = [
    { id: 1, title: "Spaghetti Bolognese", description: "Classic Italian pasta with rich meat sauce", minutes_needed: 45 },
    { id: 2, title: "Chicken Curry", description: "Spicy and creamy chicken curry", minutes_needed: 40 },
    { id: 3, title: "Vegetable Stir Fry", description: "Quick Asian-style stir fried vegetables", minutes_needed: 20 },
    { id: 4, title: "Beef Tacos", description: "Mexican-style spiced beef tacos", minutes_needed: 30 },
    { id: 5, title: "Caesar Salad", description: "Crisp salad with creamy Caesar dressing", minutes_needed: 15 },
    { id: 6, title: "Margherita Pizza", description: "Simple Italian pizza with tomato and mozzarella", minutes_needed: 30 },
    { id: 7, title: "Grilled Salmon", description: "Healthy grilled salmon with lemon", minutes_needed: 25 },
    { id: 8, title: "French Omelette", description: "Soft and buttery French omelette", minutes_needed: 10 },
    { id: 9, title: "Tomato Soup", description: "Creamy and comforting tomato soup", minutes_needed: 35 },
    { id: 10, title: "Falafel Wrap", description: "Middle Eastern chickpea patties in wrap", minutes_needed: 30 },
    { id: 11, title: "Beef Burger", description: "Juicy grilled beef burger with cheese", minutes_needed: 25 },
    { id: 12, title: "Pad Thai", description: "Thai-style stir-fried noodles with peanuts", minutes_needed: 35 },
    { id: 13, title: "Greek Salad", description: "Fresh salad with feta and olives", minutes_needed: 15 },
    { id: 14, title: "Lasagna", description: "Layered pasta with meat and béchamel sauce", minutes_needed: 60 },
    { id: 15, title: "Chicken Alfredo Pasta", description: "Creamy pasta with chicken and parmesan", minutes_needed: 35 },
    { id: 16, title: "Shakshuka", description: "Eggs poached in spicy tomato sauce", minutes_needed: 25 },
    { id: 17, title: "Pumpkin Soup", description: "Creamy seasonal pumpkin soup", minutes_needed: 40 },
    { id: 18, title: "Chicken Fried Rice", description: "Chinese-style fried rice with chicken", minutes_needed: 25 },
    { id: 19, title: "Vegetable Soup", description: "Hearty mixed vegetable soup", minutes_needed: 50 },
    { id: 20, title: "Banana Pancakes", description: "Fluffy pancakes with bananas", minutes_needed: 20 }
];

// TODO: change array iterations to sql querys when db is ready

const Recipes = {
    searchRecipe: (searchTerm) => {
        return new Promise((resolve, reject) => {
            const result = [];
            recipes.map(recipe => {
                if (searchTerm === "") return result.push(recipe);
                return (
                    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
                ) && result.push(recipe);
            })
            resolve(result);
        })
    },
    find: (limit) => {
        return new Promise((resolve, reject) => {
            const result = [];
            const iterationCount = limit ? recipes.length - limit : 0;
            for (let i = recipes.length - 1; i >= iterationCount; i--) {
                result.push(recipes[i]);
            }
            resolve(result);
        })
    },
    count: () => {
        return new Promise(resolve => {
            resolve(recipes.length);
        })
    }
}

export default Recipes;
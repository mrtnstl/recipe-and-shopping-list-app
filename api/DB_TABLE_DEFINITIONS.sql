CREATE TYPE user_sex_enum AS ENUM('male','female','other');

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_handle VARCHAR(40) UNIQUE NOT NULL,
    user_email TEXT UNIQUE NOT NULL,
    user_sex USER_SEX_ENUM NOT NULL,
    profile_pic TEXT DEFAULT '',
    pw_hash TEXT NOT NULL,
    pw_salt TEXT NOT NULL,
    user_status VARCHAR(20) DEFAULT '',
    forgot_pw_token TEXT DEFAULT NULL,
    forgot_pw_expires_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY, -- gen by server
    title VARCHAR(60) NOT NULL,
    user_id UUID NOT NULL, --FK
    description TEXT NOT NULL,
    minutes_needed SMALLINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    rating SMALLINT DEFAULT NULL,
    favorited_count INT DEFAULT NULL,
    cooked_count INT DEFAULT NULL,
    execution_step_count SMALLINT DEFAULT NULL
);

CREATE INDEX recipe_search_idx ON recipes USING GIN (to_tsvector('english', title || ' ' || description));
/*
SELECT *, ts_rank(to_tsvector(title || ' ' || description), websearch_to_tsquery('beef')) as rank 
  FROM recipes WHERE to_tsvector(title || ' ' || description) @@ websearch_to_tsquery('beef') 
  ORDER BY rank DESC, created_at DESC;
*/

CREATE TABLE IF NOT EXISTS execution_steps (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    recipe_id TEXT REFERENCES recipes (id), --FK
    step_num SMALLINT NOT NULL,
    description TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS ingredients ( --SEED THIS TABLE!
    id TEXT PRIMARY KEY,
    name VARCHAR(40) NOT NULL, --UNIQUE,
    unit VARCHAR(20) NOT NULL,
    type VARCHAR(20) NOT NULL
);
ALTER TABLE "ingredients"
ADD CONSTRAINT "ingredients_name_key" UNIQUE ("name");

--ingredient seed, put it through the api
/*
{"data":[
{"ingredientName": "Ground beef", "ingredientType": "meat","unit": "gram"},
{"ingredientName":"Chicken breast","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Bacon","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Pork ribs","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Pork shoulder","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Lamb","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Ground lamb","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Beef chunks","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Beef strips","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Chicken","ingredientType":"meat","unit":"gram"},
{"ingredientName":"Salmon fillet","ingredientType":"fish","unit":"gram"},
{"ingredientName":"White fish fillet","ingredientType":"fish","unit":"gram"},
{"ingredientName":"Shrimp","ingredientType":"seafood","unit":"gram"},
{"ingredientName":"Clams","ingredientType":"seafood","unit":"gram"},
{"ingredientName":"Onion","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Garlic","ingredientType":"vegetable","unit":"clove"},
{"ingredientName":"Carrot","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Bell pepper","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Lettuce","ingredientType":"vegetable","unit":"gram"},
{"ingredientName":"Romaine lettuce","ingredientType":"vegetable","unit":"gram"},
{"ingredientName":"Tomato","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Broccoli","ingredientType":"vegetable","unit":"gram"},
{"ingredientName":"Cucumber","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Red onion","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Pumpkin","ingredientType":"vegetable","unit":"gram"},
{"ingredientName":"Potato","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Celery","ingredientType":"vegetable","unit":"stalk"},
{"ingredientName":"Eggplant","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Zucchini","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Mushroom","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Green onion","ingredientType":"vegetable","unit":"stalk"},
{"ingredientName":"Red pepper","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Cabbage leaf","ingredientType":"vegetable","unit":"leaf"},
{"ingredientName":"Beetroot","ingredientType":"vegetable","unit":"piece"},
{"ingredientName":"Arugula","ingredientType":"vegetable","unit":"gram"},
{"ingredientName":"Coleslaw","ingredientType":"vegetable","unit":"gram"},
{"ingredientName":"Peas","ingredientType":"vegetable","unit":"gram"},
{"ingredientName":"Tortilla","ingredientType":"bread","unit":"piece"},
{"ingredientName":"Tortilla wrap","ingredientType":"bread","unit":"piece"},
{"ingredientName":"Croutons","ingredientType":"bread","unit":"gram"},
{"ingredientName":"Pizza dough","ingredientType":"bread","unit":"gram"},
{"ingredientName":"Lasagna sheets","ingredientType":"pasta","unit":"gram"},
{"ingredientName":"Pasta","ingredientType":"pasta","unit":"gram"},
{"ingredientName":"Spaghetti","ingredientType":"pasta","unit":"gram"},
{"ingredientName":"Rice noodles","ingredientType":"pasta","unit":"gram"},
{"ingredientName":"Macaroni","ingredientType":"pasta","unit":"gram"},
{"ingredientName":"Ramen noodles","ingredientType":"pasta","unit":"gram"},
{"ingredientName":"Noodles","ingredientType":"pasta","unit":"gram"},
{"ingredientName":"Burger bun","ingredientType":"bread","unit":"piece"},
{"ingredientName":"Baguette","ingredientType":"bread","unit":"piece"},
{"ingredientName":"Pie crust","ingredientType":"bread","unit":"piece"},
{"ingredientName":"Flour","ingredientType":"grain","unit":"gram"},
{"ingredientName":"Breadcrumbs","ingredientType":"grain","unit":"gram"},
{"ingredientName":"Rice","ingredientType":"grain","unit":"gram"},
{"ingredientName":"Cheddar cheese","ingredientType":"dairy","unit":"gram"},
{"ingredientName":"Gruyère cheese","ingredientType":"dairy","unit":"gram"},
{"ingredientName":"Mozzarella cheese","ingredientType":"dairy","unit":"gram"},
{"ingredientName":"Parmesan cheese","ingredientType":"dairy","unit":"gram"},
{"ingredientName":"Sour cream","ingredientType":"dairy","unit":"ml"},
{"ingredientName":"Cream cheese","ingredientType":"dairy","unit":"gram"},
{"ingredientName":"Goat cheese","ingredientType":"dairy","unit":"gram"},
{"ingredientName":"Cream","ingredientType":"dairy","unit":"ml"},
{"ingredientName":"Butter","ingredientType":"dairy","unit":"gram"},
{"ingredientName":"Milk","ingredientType":"dairy","unit":"ml"},
{"ingredientName":"Egg","ingredientType":"dairy","unit":"piece"},
{"ingredientName":"Chickpeas","ingredientType":"legume","unit":"gram"},
{"ingredientName":"Kidney beans","ingredientType":"legume","unit":"gram"},
{"ingredientName":"Black beans","ingredientType":"legume","unit":"gram"},
{"ingredientName":"Tofu","ingredientType":"legume","unit":"gram"},
{"ingredientName":"Peanut","ingredientType":"nut","unit":"gram"},
{"ingredientName":"Peanut butter","ingredientType":"nut","unit":"tbsp"},
{"ingredientName":"Walnut","ingredientType":"nut","unit":"gram"},
{"ingredientName":"Basil","ingredientType":"herb","unit":"leaf"},
{"ingredientName":"Cumin","ingredientType":"spice","unit":"tsp"},
{"ingredientName":"Curry powder","ingredientType":"spice","unit":"tbsp"},
{"ingredientName":"Paprika","ingredientType":"spice","unit":"tsp"},
{"ingredientName":"Parsley","ingredientType":"herb","unit":"tbsp"},
{"ingredientName":"Pepper","ingredientType":"spice","unit":"tsp"},
{"ingredientName":"Salt","ingredientType":"spice","unit":"tsp"},
{"ingredientName":"Chili powder","ingredientType":"spice","unit":"tsp"},
{"ingredientName":"Fajita seasoning","ingredientType":"spice","unit":"tbsp"},
{"ingredientName":"Baking powder","ingredientType":"spice","unit":"tsp"},
{"ingredientName":"Lemon","ingredientType":"fruit","unit":"piece"},
{"ingredientName":"Olive","ingredientType":"fruit","unit":"gram"},
{"ingredientName":"Banana","ingredientType":"fruit","unit":"piece"},
{"ingredientName":"Avocado","ingredientType":"fruit","unit":"piece"},
{"ingredientName":"Lime","ingredientType":"fruit","unit":"piece"},
{"ingredientName":"Tomato sauce","ingredientType":"sauce","unit":"ml"},
{"ingredientName":"Béchamel sauce","ingredientType":"sauce","unit":"ml"},
{"ingredientName":"Caesar dressing","ingredientType":"sauce","unit":"ml"},
{"ingredientName":"Soy sauce","ingredientType":"sauce","unit":"ml"},
{"ingredientName":"Olive oil","ingredientType":"oil","unit":"ml"},
{"ingredientName":"Sesame oil","ingredientType":"oil","unit":"ml"},
{"ingredientName":"BBQ sauce","ingredientType":"sauce","unit":"ml"},
{"ingredientName":"Balsamic vinegar","ingredientType":"sauce","unit":"ml"},
{"ingredientName":"Vegetable stock","ingredientType":"liquid","unit":"ml"},
{"ingredientName":"Chicken stock","ingredientType":"liquid","unit":"ml"},
{"ingredientName":"Beef stock","ingredientType":"liquid","unit":"ml"},
{"ingredientName":"Beer","ingredientType":"liquid","unit":"ml"},
{"ingredientName":"Skewer","ingredientType":"tool","unit":"piece"}
]}
*/
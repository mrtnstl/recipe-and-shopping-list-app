# recipe-and-shopping-list-webapp

A webapplication where users can browse and upload recipes, create shopping lists for their chosen dishes and track their fridges content for more accurate shopping list generation. (in progress...)

## Use Cases

- As a visitor, i want to browse between recipes and users
- As a visitor, i want to create a shopping list for the recipe i selected
- As a visitor, i want to create a user account through registration

- As a registered user, I want to reset my password via email so i can regain access if i forget it.
- 

## Roles and permissions


| role      | permission        |
|-----------|-------------------|
| 
|
|

## Stack

| layer     | technology            |
|-----------|-----------------------|
| Frontend  | React, Tailwindcss    |
| Backend   | Node.js, Express      |
| Db        | Postgres              |

More details about the stack below...

### Frontend



### Backend

#### Routes

[detailed API docs link placeholder](broken.link-for.now "Detailed API docs")

#### Middleware

- auth
   * loginMW
   * logoutMW
   * verifyAccessTokenMW

- user
   * createUserMW
   * modifyUserMW
   * getAllUserMW
   * getUserByIdMW
   * forgotPasswordMW
   * getUserByPwTokenMW
   * setNewPasswordMW

- recipe
   * createRecipeMW
   * modifyRecipeMW
   * deleteRecipeMW
   * getRecipeByIdMW
   * getRecipeByIngredientMW
   * getRecipeByGastroPreferenceMW
   * getAllRecipesMW
   * getTopRecipesMW
   

- fridge(private)
   * getFridgeByUserIdMW
   * addIngredientToFridge
   * modifyIngredientInFridgeMW
   * deleteIngredientFromFridgeMW
   * clearFridgeContentMW

- shoppinglist(private)
   * createListMW
   * deleteListMW
   * addItemMW
   * modifyItemMW
   * deleteItemMW
   * markListAsCompletedMW


### Database

Models

![Models](https://github.com/mrtnstl/recipe-and-shopping-list-app/blob/main/docs/models_v1.png "Models")

Entity Relationship Diagram

![ERD v1](https://github.com/mrtnstl/recipe-and-shopping-list-app/blob/main/docs/entity-relationship-diagram_v1.png "ERD v1")






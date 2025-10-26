import HomePage from './pages/public/HomePage.jsx';
import RecipesPage from './pages/public/RecipesPage.jsx';
import RecipePage from './pages/public/RecipePage.jsx';
import ChefPage from './pages/public/ChefPage.jsx';
import AuthPage from './pages/public/AuthPage.jsx';
import CreateRecipePage from './pages/user/CreateRecipePage.jsx';
import NotFound from './pages/public/NotFound.jsx';

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate } from "react-router-dom";
import RootLayout from './layout/RootLayout.jsx';

import ProfileLayout from './layout/ProfileLayout.jsx';
import UserProfile from './components/UserProfile.jsx';
import UserRecipes from './components/UserRecipes.jsx';
import UserFridge from './components/UserFridge.jsx';
import UserShoppingLists from './components/UserShoppingLists.jsx';
import UserCooked from './components/UserCooked.jsx';

import ForgotPasswordPage from './pages/public/ForgotPasswordPage.jsx';
import ForgotPasswordLayout from './layout/ForgotPasswordLayout.jsx';
import ForgotPasswordForm from './components/password/ForgotPasswordForm.jsx';
import SetNewPasswordForm from './components/password/SetNewPasswordForm.jsx';

import { useAuth } from './contexts/AuthContext.jsx';
import { useEffect } from 'react';
import { refresh } from './services/auth.js';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={"/"} element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"recipes"} element={<RecipesPage />} />
        <Route path={"recipe/:recipeId"} element={<RecipePage />} />
        <Route path={"create-recipe"} element={<CreateRecipePage />} />
        <Route path={"chef/:userId"} element={<ChefPage />} />
        <Route path={"profile"} element={<ProfileLayout />} >
          <Route path={""} element={<UserProfile />} />
          <Route path={"recipes"} element={<UserRecipes />} />
          <Route path={"fridge"} element={<UserFridge />} />
          <Route path={"shopping-lists"} element={<UserShoppingLists />} />
          <Route path={"cooked"} element={<UserCooked />} />
        </Route>
        <Route path={"login"} element={<AuthPage />} />
        <Route path={"forgot-password"} element={<ForgotPasswordLayout />}>
          <Route path={""} element={<ForgotPasswordForm />} />
          <Route path={":userId/:forgotPwToken"} element={<SetNewPasswordForm />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />

      </Route>
    ));

  const { setUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await refresh();
        setUser(...userData, accessToken = res.accessToken);
      } catch (err) {
        console.log(err)
      }
    })();
  }, [setUser]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;

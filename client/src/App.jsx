
import HomePage from './pages/HomePage.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import ChefPage from './pages/ChefPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFound from './pages/NotFound.jsx';

import UserProfile from './components/UserProfile.jsx';
import UserRecipes from './components/UserRecipes.jsx';

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate } from "react-router-dom";
import RootLayout from './layout/RootLayout.jsx';
import ProfileLayout from './layout/ProfileLayout.jsx';

import { fetchWithRetry } from "./utils/fetchWithAutoRefreshToken.js";
import LoginForm from './components/LoginForm.jsx';
import { logout } from './services/auth.js';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
  const { user, setUser } = useAuth();
  //const navigate = useNavigate();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={"/"} element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"recipes"} element={<RecipesPage />} />
        <Route path={"chef/:userId"} element={<ChefPage />} />
        <Route path={"profile"} element={<ProfileLayout />} >
          <Route path={""} element={<UserProfile />} />
          <Route path={"recipes"} element={<UserRecipes />} />
        </Route>
        <Route path={"login"} element={<LoginPage />} />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App;

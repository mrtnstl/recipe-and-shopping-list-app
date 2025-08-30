import { useEffect, useState } from 'react';
import { fetchWithRetry } from "./utils/fetchWithAutoRefreshToken.js";
import LoginForm from './components/LoginForm.jsx';
import { logout } from './services/auth.js';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
  const { user, setUser } = useAuth();
  const [shoppingList, setShoppingList] = useState([{ id: 21, product_name: "semmi" }]);

  const handleDelete = async (id) => {

    try {
      const result = await fetchWithRetry(`http://localhost:5000/api/users/${id}`, {
        method: "delete",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      }, user, setUser);
      const data = await result.json();
      if (!result.ok) {
        return console.error(data.message)
      }
      console.log("User deleted", data.message);
    } catch (err) {
      console.log(err);
    }
  }


  const getList = async () => {
    try {
      const shoppingListResult = await fetchWithRetry(`http://localhost:5000/api/shopping-list/${1}`, {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      }, user, setUser)
      if (!shoppingListResult.ok) {
        return console.log("Valami hiba történt!")
      }
      const data = await shoppingListResult.json();
      setShoppingList(data)
    } catch (err) { console.log(err.message) }
  }
  /*
    useEffect(async () => {
      try {
        const shoppingListResult = await fetchWithRetry(`http://localhost:5000/api/shopping-list/${1}`, {
          method: "get",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }, user, setUser)
        if (!shoppingListResult.ok) {
          return console.log("Valami hiba történt!")
        }
        const data = await shoppingListResult.json();
        setShoppingList(data)
      } catch (err) { console.log(err.message) }
    }, [shoppingList])
  */
  return (
    <div className='bg-gray-800 h-screen text-gray-300'>
      {user.username ? (
        <div>
          <span>Welcome to the {user.isAdmin ? "Admin" : "user"} dashboard {user.username}</span>
          <button onClick={getList}>[get list]</button>
          {shoppingList.length > 0 ? shoppingList.map(item => (
            <p key={item.id}>{item.product_quantity} {item.product_unit} <b>{item.product_name}</b>,{" "}
              {item.estimated_price_per_unit * item.product_quantity} {item.currency}</p>
          )) : <p>Üres a bevásárló lista :(</p>
          }
        </div>
      ) : <LoginForm />
      }

    </div>
  )
}

export default App

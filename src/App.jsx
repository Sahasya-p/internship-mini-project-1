import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.log(error);
    }
  };

  const colors = [
    "card1",
    "card2",
    "card3",
    "card4",
    "card5",
    "card6",
  ];

  return (
    <div className="app">
      <h1>🍽 Recipe Finder</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search your favorite recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={fetchRecipes}>Search</button>
      </div>

      <div className="recipe-container">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div
              key={recipe.idMeal}
              className={`recipe-card ${
                colors[index % colors.length]
              }`}
            >
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />

              <div className="card-content">
                <h2>{recipe.strMeal}</h2>

                <p>
                  <strong>Category:</strong> {recipe.strCategory}
                </p>

                <p>
                  <strong>Cuisine:</strong> {recipe.strArea}
                </p>

                <p className="instructions">
                  {recipe.strInstructions.slice(0, 120)}...
                </p>

                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch Recipe
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="menu-grid">
            <div className="menu-card card1">
              🍕 Pizza
            </div>

            <div className="menu-card card2">
              🍔 Burger
            </div>

            <div className="menu-card card3">
              🍝 Pasta
            </div>

            <div className="menu-card card4">
              🥗 Salad
            </div>

            <div className="menu-card card5">
              🍜 Noodles
            </div>

            <div className="menu-card card6">
              🍩 Dessert
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
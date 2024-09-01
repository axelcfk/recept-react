"use client";

import { useState, useEffect } from "react";

export default function AllRecipes() {
  const apiKey = "fb3d7b405dd04a3e86bb647c56d1e57a";
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
        );
        const result = await response.json();
        if (response.ok) {
          setRecipes(result.results);
        }
        console.log(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchRecipes();
  }, []);


  const addToFavorites = (recipe) => {
    setFavorites([...favorites, recipe]);
  }

  return (
    <div>
      <ul className="grid grid-cols-5">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="list-none">
            <img
              className="max-w-full"
              src={recipe.image}
              alt="Picture unavailable"
            />
            <h2 className="text-sm leading-tight">{recipe.title}</h2>
            <button onClick={addToFavorites}>Add Favorite</button>
          </li>
        ))}
      </ul>
      <h1>My Favorite Recipes</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id} className="list-none">
            <img
              className="max-w-full"
              src={favorite.image}
              alt="Picture unavailable"
            />
            <h2 className="text-sm leading-tight">{favorite.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

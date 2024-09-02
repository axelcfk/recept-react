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
            // fyll arrayen med datan
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

  const removeFromFavorites = (recipe) => {
    // skapar en ny lista (updatedFavorites) med alla recept förutom
    // det aktuella id:et
    // fav.id är det aktuella receptet i favorit listan
    // recipe.id är receptet man vill ta bort
    // alla id:en som inte matchar det aktuella är kvar i listan.
    const updatedFavorites = favorites.filter((fav) => fav.id!== recipe.id);
    setFavorites(updatedFavorites);
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
            <button onClick={() => addToFavorites(recipe)}>Add Favorite</button>
          </li>
        ))}
      </ul>
      <h1>My Favorite Recipes</h1>
      <ul className="grid grid-cols-5">
        {favorites.map((favorite) => (
          <li key={favorite.id} className="list-none">
            <img
              className="max-w-full"
              src={favorite.image}
              alt="Picture unavailable"
            />
            <h2 className="text-sm leading-tight">{favorite.title}</h2>
            <button onClick={() => removeFromFavorites(favorite)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function AllRecipes() {
  const apiKey = "fb3d7b405dd04a3e86bb647c56d1e57a";
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(
          "https://api.spoonacular.com/recipes/complexSearch?apiKey=fb3d7b405dd04a3e86bb647c56d1e57a"
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

  return (
    <div>
      <ul className="grid grid-cols-6">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="list-none">
            <img
              className="w-"
              src={recipe.image}
              alt="Picture unavailable"
            />{" "}
            <button>{recipe.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

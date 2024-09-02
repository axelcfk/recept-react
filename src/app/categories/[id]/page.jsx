"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const [recipes, setRecipes] = useState([]);
  // userouter hämtar kategori-id:et från url:en
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // se till att det finns ett id, annars kommer man inte vidare.

    async function fetchRecipesByCategory() {
      try {
        const response = await fetch(
          // hämtar recepten baserat på kategori-id:et i url:en
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
        );
        const result = await response.json();
        if (response.ok) {
          setRecipes(result.meals);
        }
        console.log(result);
      } catch (err) {
        console.error("Error fetching categories: ", err);
      }
    }
    fetchRecipesByCategory();
  }, [id]);

  return (
    <div>
      <h1>Recipes in {id} Category</h1>
      <ul>
        {recipes.map((recipe) => (
          <div>
            <li key={recipe.idMeal}></li>
            <img src={recipe.strMealTbumb} alt={recipe.strMeal} />
            <h2>{recipe.strMeal}</h2>
          </div>
        ))}
      </ul>
    </div>
  );
}

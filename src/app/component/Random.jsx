import React, { useState } from "react";

const RandomRecipe = () => {
  const [random, setRandom] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRandomRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=fb3d7b405dd04a3e86bb647c56d1e57a"
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Sortera recepten efter ID
        const sortedRecipes = data.results.sort((a, b) => a.id - b.id);
        // Välj ett slumpmässigt index i den sorterade listan
        const randomIndex = Math.floor(Math.random() * sortedRecipes.length);
        setRandom(sortedRecipes[randomIndex]); // Sätt det slumpmässiga receptet
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={getRandomRecipe}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Loading..." : "Get Random Recipe"}
      </button>

      {random && (
        <div className="mt-8 p-4 bg-white shadow-md rounded-lg w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">{random.title}</h2>
          <img
            src={random.image}
            alt={random.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <a
            href={`https://spoonacular.com/recipes/${random.title}-${random.id}`}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Recipe
          </a>
        </div>
      )}
    </div>
  );
};

export default RandomRecipe;

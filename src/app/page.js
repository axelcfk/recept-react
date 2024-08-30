"use client";
import { useState, useEffect } from "react";
import Login from "./LogIn";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const placeholderImage = "spaghetti-bolognese.jpg";
  const [searchedIngredients, setSearchedIngredients] = useState(null);
  const [searchedInstructions, setSearchedInstructions] = useState(null);
  const [searchedImage, setSearchedImage] = useState(null);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [image, setImage] = useState(placeholderImage);
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    const savedUsername = localStorage.getItem("username");
    if (loggedInUser && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  // Upload image
  function uploadImage(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        setUploadedImage(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  // Submit recipe and create card
  function submitRecipe(e) {
    e.preventDefault();

    if (name === "" || ingredients === "" || instruction === "") {
      setValid(false);
      setErrorMessage("All fields are required");
    } else {
      setValid(true);
      setErrorMessage("");
      console.log("Recipe submitted:", name, ingredients, instruction, image);
      // createRecipeCard(name, ingredients, instruction, image); // Implement this function
    }
  }

  // Search for a recipe
  async function searchRecipe() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const data = await response.json();

    console.log(data);
    const meal = data.meals ? data.meals[0] : null;

    if (meal) {
      setSearchedIngredients(meal.strIngredient1); // etc. for all ingredients
      setSearchedInstructions(meal.strInstructions);
      setSearchedImage(meal.strMealThumb);
    } else {
      setErrorMessage("No recipes found.");
    }
  }

  return (
    <main>
      <nav className="bg-green-200 text-3xl px-10 flex justify-between">
        <h1>Best Recipes</h1>
        <div className="flex flex-row space-x-2">
          <p>Search</p>
        </div>
      </nav>
      <div className="flex justify-center flex-col items-center px-40">
        <div className="flex flex-row pt-20">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search any recipe..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={searchRecipe} id="searchButton">
            Search
          </button>
        </div>
        <h1>My recipe list</h1>
        <h1>Recipes and stuff</h1>
        <h1>Add a new recipe</h1>
        <div>
          <form id="form">
            <div>
              <h2>Name</h2>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <h2>Ingredients</h2>
            <textarea
              id="ingredients"
              cols="30"
              rows="10"
              onChange={(e) => setIngredients(e.target.value)}
              value={ingredients}
            ></textarea>

            <h2>Instruction</h2>
            <textarea
              id="instruction"
              cols="30"
              rows="10"
              onChange={(e) => setInstruction(e.target.value)}
              value={instruction}
            ></textarea>

            <h2>Image</h2>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={uploadImage}
            />

            <button onClick={submitRecipe} id="save">
              Save Recipe
            </button>
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </form>
        </div>

        <Login
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
        />

        <div id="recipeCardsContainer"></div>
      </div>
    </main>
  );
}


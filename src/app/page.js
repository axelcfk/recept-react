"use client";

import { useState } from "react";
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

  //ladda upp bild
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

  //submitta receptet och skapa kort
  function submitRecipe(e) {
    e.preventDefault();

    if (name === "" || ingredients === "" || instruction === "") {
      setValid(false);
      setErrorMessage("All fields are required");
    }

    console.log("data är", name, ingredients, instruction);
    // if (valid) {
    //   createRecipeCard(name, ingredients, instruction, image);

    // }
  }

  //sök på recept

  async function searchRecipe() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const data = await response.json();

    console.log(data);
    const meal = data.meals[0];
  }

  return (
    <main>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search any recipe..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchRecipe} id="searchButton">
          Search
        </button>
        <h1>Recipes and stuff</h1>
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
            <input type="file" id="image" accept="image/*" />

            <button onClick={(uploadImage, submitRecipe)} id="save">
              Save Recipe
            </button>
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </form>
        </div>

        <div>
          <input type="text" placeholder="Username" id="username" />
          <input type="password" placeholder="password" id="password" />
          <button type="submit" id="loginButton">
            Login
          </button>
          <div id="loginError"></div>
        </div>

        <div id="recipeCardsContainer"></div>
      </div>
    </main>
  );
}

//funktion för att söka på recept
// document
//   .getElementById("searchButton")
//   .addEventListener("click", async function () {
//     const searchName = document.getElementById("search").value;

//     const response = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
//     );
//     const data = await response.json();
//     console.log(data);
//     const meal = data.meals[0];
//     const instructions = meal.strInstructions;
//     const ingredients = [];

//     //loopar igenom all strIngredients och strMeasure
//     for (let i = 1; i <= 20; i++) {
//       const ingredient = meal[`strIngredient${i}`];
//       const measure = meal[`strMeasure${i}`];

//       if (ingredient && ingredient.trim()) {
//         ingredients.push(`${measure} ${ingredient}`.trim());
//       }
//     }

//     searchedIngredients = ingredients;
//     searchedInstructions = instructions;
//     searchedImage = meal.strMealThumb;

//     document.querySelector("form textarea").textContent = ingredients;
//     document.querySelector("form textarea:nth-of-type(2)").textContent =
//       instructions;
//     document.querySelector("form input").value = searchName;

//     console.log("ingredients are:", ingredients);
//     console.log("Instructions are:", instructions);
//   });

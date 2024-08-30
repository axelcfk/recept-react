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
  function SubmitRecipe(e) {
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
  return (
    <main>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search any recipe..."
        />
        <button id="searchButton">Search</button>
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

            <button onClick={(uploadImage, SubmitRecipe)} id="save">
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

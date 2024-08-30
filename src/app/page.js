"use client";

import { useState } from "react";
export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const placeholderImage = "spaghetti-bolognese.jpg";
  const [searchedIngredients, setSearchedIngredients] = useState(null);
  const [searchedInstructions, setSearchedInstructions] = useState(null);
  const [searchedImage, setSearchedImage] = useState(null);

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
  return (
    <main>
      <div class="container">
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
              <h2 id>Name</h2>
              <input type="text" id="name" />
            </div>

            <h2>Ingredients</h2>
            <textarea name="" id="ingredients" cols="30" rows="10"></textarea>

            <h2>Instruction</h2>
            <textarea name="" id="instruction" cols="30" rows="10"></textarea>

            <h2>Image</h2>
            <input type="file" id="image" accept="image/*" />

            <button id="save">Save Recipe</button>
          </form>
        </div>

        <div class="login-form">
          <input type="text" placeholder="Username" id="username" />
          <input type="password" placeholder="password" id="password" />
          <button type="submit" id="loginButton">
            Login
          </button>
          <div id="loginError"></div>
        </div>

        <div id="recipeCardsContainer" class="recipeCardsContainer"></div>
      </div>
    </main>
  );
}

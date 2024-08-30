"use client";
import { useState, useEffect } from "react";
import Login from "./LogIn";
import RecipeCard from "./component/RecipeCard";
import Link from "next/link";

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
  const [id, setId] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);
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
      return;
    } else {
      setValid(true);
      setErrorMessage("");
    }

    console.log("data är", name, ingredients, instruction);

    setMyRecipes((prevMyRecipes) => [
      ...prevMyRecipes,
      { name, ingredients, instruction, imgSrc: uploadedImage },
    ]);
  }

  // Search for a recipe
  async function searchRecipe() {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const data = await response.json();

    console.log(data);
    const meal = data.meals[0];
    const instructions = meal.strInstructions;
    const ingredients = [];
    const id = meal.idMeal;

    //loopar igenom all strIngredients och strMeasure
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    setId(id);
    setSearchedIngredients(ingredients);
    setSearchedInstructions(instructions);
    setSearchedImage(meal.strMealThumb);
    setName(meal.strMeal);

    console.log(ingredients);
    console.log(instructions);
    console.log(meal.strMealThumb);
  }

  return (
    <main className="">
      <nav className="bg-green-200 text-3xl px-10 flex justify-between">
        <h1>Best Recipes</h1>
        <div className="flex flex-row space-x-2">
          <p>sök</p>
          <p>gubbe</p>
        </div>
      </nav>
      <div className="flex justify-center flex-col items-center px-40">
        <div className="flex flex-row mt-20 h-16 justify-center w-96">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search any recipe..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-l-xl bg-gray-100 border-transparent"
          />

          <button onClick={() => {
              searchRecipe();
              setSearchButtonClicked(true);
            }} id="searchButton" className="rounded-r-xl border-transparent">
            Search
          </button>
          {searchButtonClicked && (
            <Link href={id && `/recipe/${id}`}>
              <div className="flex bg-slate-400">
                <div>
                  <img
                    src={searchedImage}
                    alt="Search Result"
                    className="h-16"
                  />
                </div>
                <div>
                  <h2>{name}</h2>
                </div>
              </div>
            </Link>
          )}
        </div>
        <h1>My recipe list</h1>
        <h1>Recipes and stuff</h1>
        <h1>Add a new recipe</h1>
        <div>
          <form onSubmit={submitRecipe} id="">
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
            <input onChange={uploadImage} type="file" id="image" accept="image/*" />

         
            <button type="submit" id="save">
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

        <div className="flex gap-4 w-[80%] p-12 h-80 overflow-x-scroll flex-nowrap items-center">
          {myRecipes.length > 0
            ? myRecipes.map((myRecipe, index) => {
                return (
                  <RecipeCard
                    key={index}
                    name={myRecipe.name}
                    ingredients={myRecipe.ingredients}
                    instruction={myRecipe.instruction}
                    imgSrc={myRecipe.imgSrc}
                  />
                );
              })
            : ""}
          
        </div>
      </div>
    </main>
  );
}

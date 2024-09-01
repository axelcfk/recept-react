"use client";
import { useState, useEffect, useContext } from "react";
import Login from "./LogIn";
import RecipeCard from "./component/RecipeCard";
import Link from "next/link";
import { MyRecipesContext } from "../../myRecipesContext";
import RandomRecipe from "./component/Random";
import Categories from "./component/Categories";
import AllRecipes from "./component/AllRecipes";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const placeholderImage = "spaghetti-bolognese.jpg";
  const [searchedIngredients, setSearchedIngredients] = useState(null);
  const [searchedInstructions, setSearchedInstructions] = useState(null);
  const [searchedImage, setSearchedImage] = useState(null);
  const [name, setName] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  //const [myRecipes, setMyRecipes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const { myRecipes, addNewRecipe } = useContext(MyRecipesContext);

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

    const allMyRecipeIndexes = [];

    myRecipes.forEach((myRecipe) => {
      if (myRecipe.myRecipeIndex !== undefined) {
        allMyRecipeIndexes.push(myRecipe.myRecipeIndex);
      }
    });

    let newIndex = allMyRecipeIndexes.length + 1; // apparently index 0 doesnt work for routing

    console.log(newIndex);

    addNewRecipe(name, instruction, ingredients, uploadedImage, null, newIndex);
    // uploadedImage is null if none uploaded
    /* setMyRecipes((prevMyRecipes) => [
      ...prevMyRecipes,
      { name, ingredients, instruction, imgSrc: uploadedImage },
    ]); */
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
    setSearchedId(id);
    setSearchedIngredients(ingredients);
    setSearchedInstructions(instructions);
    setSearchedImage(meal.strMealThumb);
    setSearchedName(meal.strMeal);

    console.log(ingredients);
    console.log(instructions);
    console.log(meal.strMealThumb);
  }

  return (
    <main>
      <nav className="bg-green-200 text-3xl px-10 flex justify-between">
        <h1>Best Recipes</h1>
        <div className="flex flex-row space-x-4">
          <Link href="/">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="45"
                viewBox="0 96 960 960"
                width="45"
              >
                <path d="M796 936 536 676q-28 24-61.5 36.5T400 725q-90 0-152.5-62.5T185 510q0-90 62.5-152.5T400 295q90 0 152.5 62.5T615 510q0 35-12.5 68.5T566 640l260 260-30 36ZM400 675q66 0 112-46t46-112q0-66-46-112t-112-46q-66 0-112 46t-46 112q0 66 46 112t112 46Z" />
              </svg>
            </button>
          </Link>
          <Link href="/">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="45"
                viewBox="0 -960 960 960"
                width="45"
                fill="#000000"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
            </button>
          </Link>
        </div>
      </nav>
      <div className="flex">
        <Categories />

        <div className="flex-1 p-8">
          <div className="flex justify-center flex-col items-center">
            <div className="flex flex-row mt-20 h-16 justify-center w-96">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search any recipe..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-l-xl bg-gray-100 border-transparent"
              />

              <button
                onClick={() => {
                  searchRecipe();
                  setSearchButtonClicked(true);
                }}
                id="searchButton"
                className="rounded-r-xl border-transparent"
              >
                Search
              </button>
              {searchButtonClicked && (
                <Link href={searchedId && `/recipe/${searchedId}`}>
                  <div className="flex bg-slate-400">
                    <div>
                      <img
                        src={searchedImage}
                        alt="Search Result"
                        className="h-16"
                      />
                    </div>
                    <div>
                      <h2>{searchedName}</h2>
                    </div>
                    <button
                      onClick={() => {
                        addNewRecipe(
                          searchedName,
                          searchedInstructions,
                          searchedIngredients,
                          searchedImage,
                          searchedId,
                          null
                        );
                      }}
                    >
                      Save Recipe
                    </button>
                  </div>
                </Link>
              )}
            </div>
            <h1>Recipes and stuff</h1>
            <AllRecipes/>
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
                <input
                  onChange={uploadImage}
                  type="file"
                  id="image"
                  accept="image/*"
                />

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
                        apiIndex={myRecipe.apiIndex}
                        myRecipeIndex={myRecipe.myRecipeIndex}
                      />
                    );
                  })
                : ""}
            </div>
            <RandomRecipe />
          </div>
        </div>
      </div>
    </main>
  );
}

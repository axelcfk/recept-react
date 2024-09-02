"use client";
import Link from "next/link";
import LikeButton from "./LikeButton";
import Rating from "./Rating";
import { useContext, useState } from "react";
import { MyRecipesContext } from "../../../myRecipesContext";

export default function RecipeCard({
  inititalName,
  initialIngredients,
  initialInstruction,
  initialImgSrc = null,
  apiIndex = null,
  myRecipeIndex = null,
}) {
  if (!inititalName || !initialIngredients || !initialInstruction) {
    return <div className="flex h-32">Missing recipe props...</div>;
  }

  const { deleteRecipe, editRecipe } = useContext(MyRecipesContext);
  const [isEditingRecipe, setIsEditingRecipe] = useState(false);
  const [name, setName] = useState(inititalName);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instruction, setInstruction] = useState(initialInstruction);
  const [imgSrc, setImgSrc] = useState(initialImgSrc);
  // indexes shouldnt change
/*   const [apiIndex, setApiIndex] = useState(initialApiIndex); 
  const [myRecipeIndex, setMyRecipeIndex] = useState(initialMyRecipeIndex); */

  function handleEditRecipe() {
    if (myRecipeIndex) {
  
      editRecipe(
        name,
        ingredients,
        instruction,
        imgSrc,
        null, // apiIndex
        myRecipeIndex
      );
    } else if (apiIndex) {
      editRecipe(
        name,
        ingredients,
        instruction,
        imgSrc,
        apiIndex,
        null // myRecipeIndex
      );
    } else {
      console.error("no index found, couldnt delete recipe");
    }
  }

  return (
    <div
      className="flex flex-col h-72 w-44 justify-between pb-4 flex-shrink-0"
      style={{
        boxShadow: "0 0 3rem rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex h-32 w-full flex-col items-center justify-start">
        <Link
          className="w-full h-[90%]"
          href={
            myRecipeIndex
              ? `/my-recipe/${myRecipeIndex}`
              : apiIndex
              ? `/recipe/${apiIndex}`
              : "/"
          }
        >
          {" "}
          {/* ("/")  fix this? console log? or should not even occur? */}
          {imgSrc ? (
            <img
              src={imgSrc}
              alt=""
              className="w-full max-h-full object-cover"
            /> /* h-full */
          ) : (
            <img
              src="/spaghetti-bolognese.jpg"
              alt=""
              className="w-full max-h-full object-cover"
            /> /* h-full */
          )}
        </Link>

        {isEditingRecipe ? (<input value={name} onChange={(e) => {
          setName(e.target.value)
        }}/>) : (<figcaption>{name}</figcaption>)}
      </div>
      <div className="flex flex-col gap-4 h-32 w-full justify-center items-center">
        <div className="flex flex-col w-fit items-center">
          <LikeButton />
          <Rating />
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              if (myRecipeIndex) {
                deleteRecipe(myRecipeIndex);
              } else if (apiIndex) {
                deleteRecipe(apiIndex);
              } else {
                console.error("no index found, couldnt delete recipe");
              }
            }}
          >
            X
          </button>
         {isEditingRecipe ?  (<button
            onClick={() => {
              setIsEditingRecipe(false);
              handleEditRecipe();
            }}
          >
            Save
          </button>) : (<button
            onClick={() => {
              setIsEditingRecipe(true);
            }}
          >
            Edit Recipe
          </button>)}

        </div>
      </div>
    </div>
  );
}

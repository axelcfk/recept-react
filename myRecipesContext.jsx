"use client"
import { createContext, useState } from "react";

export const MyRecipesContext = createContext(null);

export function MyRecipesContextProvider({children}) {

  const [myRecipes, setMyRecipes] = useState([]);

  function addNewRecipe(name, instruction, ingredients, imgSrc = null, apiIndex = null, myRecipeIndex = null) {
    setMyRecipes((prevMyRecipes) => [
      ...prevMyRecipes,
      { name, ingredients, instruction, imgSrc, apiIndex, myRecipeIndex},
    ]);
  }

  function deleteRecipe(id) {
    setMyRecipes((prevMyRecipes) =>
      prevMyRecipes.filter((recipe) => (recipe.myRecipeIndex !== id) )
    );
    // har inte löst detta korrekt, apiIndex kan råka vara samma som myRecipeIndex
    setMyRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.apiIndex !== id)
    );
  }

  return (

    <MyRecipesContext.Provider value={{myRecipes, addNewRecipe, deleteRecipe}}>
      {children}
    </MyRecipesContext.Provider>
  )
} 
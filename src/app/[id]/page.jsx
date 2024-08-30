"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState, useRef } from "react";

export default function MoviePage() {
  const params = useParams(); // Access dynamic parameters
  const searchParams = useSearchParams(); // Access query parameters
  const router = useRouter(); // To handle navigation

  const apiIndex = params.id; // Dynamic route parameter
  const local = searchParams.get("local"); // Query parameter
  const myRecipeIndex = searchParams.get("index"); // Query parameter

 /*  const params = useParams();
  const recipeId = params.id; */



  const handleNavigation = () => {
    router.back();
  };

  useEffect(() => {
    async function fetchRecipeDetails(recipeId) {
      const response = await "";
    }
  }, []);

  return (
    <div>
      {apiIndex && <h1>hejhejhej {apiIndex}</h1>}
      {myRecipeIndex && <h1>hejhejhej {myRecipeIndex}</h1>}
    </div>
  );
}

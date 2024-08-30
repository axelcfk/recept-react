"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState, useRef } from "react";

export default function recipePage() {
  const params = useParams(); // Access dynamic parameters
  const router = useRouter(); // To handle navigation

  const id = params.id; // Dynamic route parameter

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
      {id && <h1>hejhejhej MY OWN RECIPE {id}</h1>}
    </div>
  );
}

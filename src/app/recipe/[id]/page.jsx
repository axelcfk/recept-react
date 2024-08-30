"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState, useRef } from "react";

export default function Page() {
  const params = useParams();
  const recipeId = params.id;
  const router = useRouter();

  const handleNavigation = () => {
    router.back();
  };

  //   useEffect(() => {
  //     async function fetchRecipeDetails(recipeId) {
  //       const response = await "";
  //     }
  //   }, []);

  return (
    <div>
      {recipeId && <h1>hejhejhej {recipeId}</h1>}
    </div>
  );
}

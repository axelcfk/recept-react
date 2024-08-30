"use client";

import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const result = await response.json();
        if (response.ok) {
          setCategories(result.categories);
        }
        console.log(result);
      } catch (err) {
        console.error("Error fetching categories: ", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
            <li key={category.idCategory}>{category.strCategory}</li>
        ))}
      </ul>
    </div>
  );
}
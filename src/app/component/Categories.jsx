"use client";

import Link from "next/link";
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
            // fyll arrayen med datan.
          setCategories(result.categories);
        }
        console.log(result);
      } catch (err) {
        console.error("Error fetching categories: ", err);
      }
    }
    fetchCategories();
  }, []);
  // tomt beroende => körs bara en gång

  return (
    <div className="w-1/6 bg-gray-100">
      <h1 className="text-xl pl-3 pt-3 underline">Categories</h1>
      <ul className="list-none p-4">
        {categories.map((category) => (
          <li
            key={category.idCategory}
            className="py-1"
          >
            {/* Varje listitem blir en länk till respektive kategorisida.  */}
            <Link href={`/categories/${category.strCategory}`} className="text-black text-lg no-underline hover:cursor-pointer hover:underline">
              {category.strCategory}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

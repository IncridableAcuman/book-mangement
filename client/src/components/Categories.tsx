import React, { useState } from "react";
import { UseBook } from "../context/BookProvider";

const CATEGORIES = [
  { label: "Barchasi", value: "ALL" },
  { label: "Tarix (HISTORY)", value: "HISTORY" },
  { label: "Dramatik (DRAMATIC)", value: "DRAMATIC" },
  { label: "Romantika (ROMANCE)", value: "ROMANCE" },
  { label: "Fantastika (FANTASY)", value: "FANTASY" },
  { label: "Ilmiy (SCIENCE)", value: "SCIENCE" },
  { label: "Biografiya (BIOGRAPHY)", value: "BIOGRAPHY" },
];

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const { filterBooks, fetchBooks } = UseBook();

  const handleSelectCategory = (value: string) => {
    setSelectedCategory(value);
    if (value === "ALL") {
      fetchBooks();
    } else {
      filterBooks(value, "category");
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleSelectCategory(cat.value)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
            selectedCategory === cat.value
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default Categories;

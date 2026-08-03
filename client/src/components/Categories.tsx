import { useState } from "react";

const Categories = () => {
  const categories = [
    "Barchasi",
    "Romen",
    "Qissa",
    "Badiiy",
    "Shaxsiy Rivojlanish",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
};

export default Categories;

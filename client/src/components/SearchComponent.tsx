import React, { useState } from "react";
import { Plus, Search, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import CreateDialog from "./CreateDialog";
import { UseAuth } from "../context/AuthProvider";
import { UseBook } from "../context/BookProvider";

const SearchComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = UseAuth();
  const { filterBooks, fetchBooks } = UseBook();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchBooks();
      return;
    }
    // Muallif bo'yicha qidirish
    filterBooks(searchTerm.trim(), "author");
  };

  const handleReset = () => {
    setSearchTerm("");
    fetchBooks();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Qidiruv formasi */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Muallif bo'yicha qidiring (Enter)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={handleReset}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-colors"
              title="Filtrni tozalash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* O'ng taraf: Faqat ADMIN uchun kitob qo'shish */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
          {user?.role === "ADMIN" && (
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 shrink-0 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Kitob Qo'shish</span>
            </motion.button>
          )}
          <CreateDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default SearchComponent;

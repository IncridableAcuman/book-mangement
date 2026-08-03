import { Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

const SearchComponent = () => {
  const userRole = "ADMIN";
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        {/* Qidiruv Inputi */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Kitob nomi yoki muallif bo'yicha qidiring..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* O'ng taraf: Admin uchun Qo'shish va Kategoriya tanlovlari */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
          {userRole === "ADMIN" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 shrink-0 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Kitob Qo'shish</span>
            </motion.button>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Plus, 
  LogOut, 
  User, 
  Book, 
  Bookmark, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

// Vaqtincha demo kitoblar ma'lumotlari (Backend'dan keladigan DTO'ga mos)
interface BookItem {
  id: number;
  title: string;
  author: string;
  category: string;
  available: boolean;
  coverImage?: string;
}

const DEMO_BOOKS: BookItem[] = [
  {
    id: 1,
    title: "O'tkan Kunlar",
    author: "Abdulla Qodiriy",
    category: "Romen",
    available: true,
  },
  {
    id: 2,
    title: "Dunyoning Ishlari",
    author: "O'tkir Hoshimov",
    category: "Qissa",
    available: false,
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Shaxsiy Rivojlanish",
    available: true,
  },
  {
    id: 4,
    title: "Sariq Devni Minib",
    author: "Xudoyberdi To'xtaboyev",
    category: "Badiiy",
    available: true,
  },
];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  // Backend'dan olinadigan rol (Masalan: ROLE_ADMIN yoki ROLE_USER)
  const userRole = 'ADMIN'; // Test uchun ADMIN, aks holda 'USER'

  const categories = ['Barchasi', 'Romen', 'Qissa', 'Badiiy', 'Shaxsiy Rivojlanish'];

  const filteredBooks = DEMO_BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Barchasi' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
              LibFlow
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm">
              <User className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-300 font-medium">Foydalanuvchi</span>
            </div>
            <button
              title="Chiqish"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* ACTION BAR (Qidiruv, Filtrlar va Admin tugmasi) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          {/* Qidiruv Inputi */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Kitob nomi yoki muallif bo'yicha qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* O'ng taraf: Admin uchun Qo'shish va Kategoriya tanlovlari */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
            {userRole === 'ADMIN' && (
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

        {/* CATEGORIES CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BOOKS GRID */}
        {filteredBooks.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm group hover:border-slate-700 transition-all"
              >
                <div>
                  {/* Muqova placeholder */}
                  <div className="w-full h-48 bg-slate-950 rounded-xl mb-4 flex items-center justify-center border border-slate-800 relative overflow-hidden group-hover:border-indigo-500/50 transition-colors">
                    <Book className="w-12 h-12 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {book.available ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Mavjud
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <XCircle className="w-3 h-3" /> Olingan
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1 block">
                    {book.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{book.author}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <button className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                    <Bookmark className="w-3.5 h-3.5" /> Saqlash
                  </button>
                  <button className="px-3.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors">
                    Batafsil
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Kitob topilmagandagi ko'rinish */
          <div className="text-center py-20 bg-slate-900/30 border border-slate-800/50 rounded-2xl">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">Kitoblar topilmadi</h3>
            <p className="text-slate-500 text-sm">Qidiruv so'rovini o'zgartirib ko'ring</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
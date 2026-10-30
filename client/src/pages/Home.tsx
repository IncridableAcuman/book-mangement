import React from 'react';
import Navbar from '../components/Navbar';
import SearchComponent from '../components/SearchComponent';
import Categories from '../components/Categories';
import Card from '../components/Card';
import { UseBook } from '../context/BookProvider';
import { UseAuth } from '../context/AuthProvider';
import { BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  const { books, deleteBook, loading } = UseBook();
  const { user } = UseAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER / NAVBAR */}
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <SearchComponent />
        <Categories />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm">Kitoblar yuklanmoqda...</p>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <Card 
                key={book.id} 
                book={book} 
                userRole={user?.role} 
                onDelete={(id) => deleteBook(id)} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            <BookOpen className="w-12 h-12 mb-3 text-slate-600" />
            <p className="text-base font-medium text-slate-400">Hech qanday kitob topilmadi</p>
            <p className="text-xs text-slate-600 mt-1">Boshqa toifa yoki muallif bo'yicha qidirib ko'ring</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

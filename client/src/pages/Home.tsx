import React from 'react';
import Navbar from '../components/Navbar';
import SearchComponent from '../components/SearchComponent';
import Categories from '../components/Categories';
import Card from '../components/Card';

interface BookItem {
  id: number;
  title: string;
  author: string;
  category: string;
  available: boolean;
  coverImage?: string;
}


const Home: React.FC = () => {
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




  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER / NAVBAR */}
      <Navbar/>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <SearchComponent/>
        <Categories/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
              DEMO_BOOKS
              .map((book)=>(
                <Card key={book.id} book={book} />
              ))
            }
        </div>
      </main>
    </div>
  );
};

export default Home;
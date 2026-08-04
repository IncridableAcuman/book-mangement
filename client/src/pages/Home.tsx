import React from 'react';
import Navbar from '../components/Navbar';
import SearchComponent from '../components/SearchComponent';
import Categories from '../components/Categories';
import Card from '../components/Card';
import { UseBook } from '../context/BookProvider';
import { UseAuth } from '../context/AuthProvider';


const Home: React.FC = () => {

  const { books } = UseBook();
  const { user } = UseAuth();



  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER / NAVBAR */}
      <Navbar/>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <SearchComponent/>
        <Categories/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
              books
              .map((book)=>(
                <Card key={book.id} book={book} userRole={user?.role} />
              ))
            }
        </div>
      </main>
    </div>
  );
};

export default Home;
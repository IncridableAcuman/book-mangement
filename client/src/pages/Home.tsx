import React from 'react';
import Navbar from '../components/Navbar';
import SearchComponent from '../components/SearchComponent';
import Categories from '../components/Categories';



const Home: React.FC = () => {
 




  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* HEADER / NAVBAR */}
      <Navbar/>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <SearchComponent/>
        <Categories/>
      </main>
    </div>
  );
};

export default Home;
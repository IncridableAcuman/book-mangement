import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Zap, ArrowRight, Library, Search } from 'lucide-react';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
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
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Kirish
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 px-6">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-600/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-8 uppercase tracking-wider"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Kutubxonani boshqarishning eng oson yo'li</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]"
          >
            Kelajak kutubxonasi <br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              bir kaftingizda
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Kitoblarni qidiring, boshqaring va o'qish jarayonini xavfsiz hamda qulay muhitda nazorat qiling. Barchasi zamonaviy va tezkor tizimda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105"
            >
              <span>Boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-800 flex items-center justify-center transition-all duration-200"
            >
              Hisobga kirish
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Nima uchun aynan bizning tizim?</h2>
            <p className="text-slate-400">Kitobsevarlar va administratorlar uchun maxsus yaratilgan qulay funksiyalar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Library className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Boy Kitoblar bazasi</h3>
              <p className="text-slate-400 leading-relaxed">
                Istalgan kitobni tezkor qidirish, turkumlar bo'yicha ajratish va to'liq ma'lumot olish imkoniyati.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Xavfsiz Autentifikatsiya</h3>
              <p className="text-slate-400 leading-relaxed">
                JWT va xavfsiz HttpOnly Cookie texnologiyalari yordamida shaxsiy ma'lumotlaringiz to'liq himoyalangan.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Admin Boshqaruvi</h3>
              <p className="text-slate-400 leading-relaxed">
                Administratorlar uchun maxsus panel orqali kitoblarni qo'shish, o'chirish va tahrirlash juda oson.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Landing;
import React from 'react';
import { motion } from 'framer-motion';
import { Book, CheckCircle2, XCircle, Edit3, Trash2, Bookmark } from 'lucide-react';

interface BookItem {
  id: number;
  title: string;
  author: string;
  category: string;
  available: boolean;
  coverImage?: string;
}

interface CardProps {
  book: BookItem;
  userRole?: 'ADMIN' | 'USER';
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onAction?: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ 
  book, 
  userRole = 'USER', 
  onEdit, 
  onDelete, 
  onAction 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm group hover:border-slate-700 transition-all shadow-xl shadow-black/20"
    >
      <div>
        {/* Muqova placeholder va Status Badge */}
        <div className="w-full h-48 bg-slate-950 rounded-xl mb-4 flex items-center justify-center border border-slate-800 relative overflow-hidden group-hover:border-indigo-500/50 transition-colors">
          <Book className="w-12 h-12 text-slate-700 group-hover:text-indigo-400 transition-colors" />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {book.available ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                <CheckCircle2 className="w-3 h-3" /> Mavjud
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm">
                <XCircle className="w-3 h-3" /> Olingan
              </span>
            )}
          </div>
        </div>

        {/* Kategoriya, Nomi va Muallif */}
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1 block">
          {book.category}
        </span>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-slate-400 mb-4">{book.author}</p>
      </div>

      {/* Pastki tugmalar qismi (Role bo'yicha o'zgaradi) */}
      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
        {userRole === 'ADMIN' ? (
          <>
            <button
              onClick={() => onEdit && onEdit(book.id)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" /> Tahrirlash
            </button>
            <button
              onClick={() => onDelete && onDelete(book.id)}
              className="p-1.5 bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="O'chirish"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
              <Bookmark className="w-3.5 h-3.5" /> Saqlash
            </button>
            <button
              onClick={() => onAction && onAction(book.id)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors"
            >
              Batafsil
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
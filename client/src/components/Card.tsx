import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Bookmark } from 'lucide-react';
import type IBook from '../interface/book.interface';
import type { Role } from '../interface/user.interface';

interface CardProps {
  book: IBook;
  userRole?: Role;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onAction?: (id: number) => void;
}

const DEFAULT_BOOK_COVER = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400";

const Card: React.FC<CardProps> = ({ 
  book, 
  userRole, 
  onEdit, 
  onDelete, 
  onAction 
}) => {
  const imageUrl = (book.image && book.image.startsWith("http")) 
    ? book.image 
    : DEFAULT_BOOK_COVER;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm group hover:border-slate-700 transition-all shadow-xl shadow-black/20"
    >
      <div>
        {/* Muqova rasm */}
        <div className="w-full h-48 bg-slate-950 rounded-xl mb-4 flex items-center justify-center border border-slate-800 relative overflow-hidden group-hover:border-indigo-500/50 transition-colors">
          <img 
            src={imageUrl} 
            alt={book.title} 
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_BOOK_COVER;
            }}
          />
        </div>

        {/* Kategoriya, Nomi va Muallif */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {book.category}
          </span>
          <span className="text-xs font-bold text-emerald-400">
            ${book.price}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-slate-400 mb-2">{book.author}</p>
        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{book.description}</p>
      </div>

      {/* Pastki tugmalar qismi (Role bo'yicha) */}
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
              <Bookmark className="w-3.5 h-3.5" /> {book.pageSize} bet
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

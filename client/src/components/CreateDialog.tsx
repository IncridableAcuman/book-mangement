import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookCategoryEnum,
  bookSchema,
  type BookData,
} from "../schema/book.schema";
import { UseBook } from "../context/BookProvider";

interface BookCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDialog: React.FC<BookCreateDialogProps> = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { handleCreateBook, loading } = UseBook();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookData>({
    resolver: zodResolver(bookSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: BookData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("author", data.author);
    formData.append("pageSize", data.pageSize); // string holatida ketadi
    formData.append("category", data.category);
    formData.append("publishedDate", data.publishedDate);
    formData.append("price", data.price); // string holatida ketadi

    if (data.image) {
      formData.append("image", data.image);
    }

    await handleCreateBook(formData as unknown as BookData); // yoki providerdagi funksiyani FormData qabul qiladigan qilish
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">
                  Yangi Kitob Qo'shish
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kitob Nomi
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Masalan: O'tkan kunlar"
                  />
                  {errors.title && (
                    <span className="text-xs text-rose-400 mt-1 block">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Muallif
                  </label>
                  <input
                    type="text"
                    {...register("author")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Masalan: Abdulla Qodiriy"
                  />
                  {errors.author && (
                    <span className="text-xs text-rose-400 mt-1 block">
                      {errors.author.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Page Size */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Sahifalar soni
                  </label>
                  <input
                    type="number"
                    {...register("pageSize")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="350"
                  />
                  {errors.pageSize && (
                    <span className="text-xs text-rose-400 mt-1 block">
                      {errors.pageSize.message}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Narxi ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="19.99"
                  />
                  {errors.price && (
                    <span className="text-xs text-rose-400 mt-1 block">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kategoriya
                  </label>
                  <select
                    {...register("category")}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Tanlang</option>
                    {BookCategoryEnum.options.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-xs text-rose-400 mt-1 block">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Published Date */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Nashr etilgan sana
                </label>
                <input
                  type="date"
                  {...register("publishedDate")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                {errors.publishedDate && (
                  <span className="text-xs text-rose-400 mt-1 block">
                    {errors.publishedDate.message}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Tavsif
                </label>
                <textarea
                  rows={3}
                  {...register("description")}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Kitob haqida qisqacha ma'lumot..."
                />
                {errors.description && (
                  <span className="text-xs text-rose-400 mt-1 block">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Muqova rasmi
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-800 border-dashed rounded-xl cursor-pointer bg-slate-950 hover:border-indigo-500/50 transition-colors overflow-hidden relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
                      <Upload className="w-6 h-6 mb-2 text-indigo-400" />
                      <p className="text-xs">Rasm yuklash uchun bosing</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {errors.image && (
                  <span className="text-xs text-rose-400 mt-1 block">
                    {errors.image.message as string}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />{" "}
                  {loading ? "Qo'shilmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateDialog;

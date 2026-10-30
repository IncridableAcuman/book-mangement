import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type IBook from "../interface/book.interface";
import type { BookData } from "../schema/book.schema";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

type BookContextType = {
  book: IBook | null;
  setBook: (book: IBook | null) => void;
  books: IBook[];
  setBooks: (data: IBook[]) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  handleCreateBook: (data: BookData) => Promise<boolean>;
  getBook: (id: number) => Promise<void>;
  fetchBooks: () => Promise<void>;
  filterBooks: (value: string | number, filterType: "category" | "author" | "date" | "price") => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  editBook: (id: number, data: Partial<BookData>) => Promise<boolean>;
};

const BookContext = createContext<BookContextType | null>(null);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [book, setBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/book");
      setBooks(data);
    } catch (error) {
      console.error("Kitoblarni olishda xatolik:", error);
      toast.error("Kitoblarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleCreateBook = async (formData: BookData): Promise<boolean> => {
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        author: formData.author,
        pageSize: Number(formData.pageSize),
        category: formData.category,
        publishedDate: formData.publishedDate,
        price: Number(formData.price),
        image: formData.image || undefined
      };

      const { data } = await axiosInstance.post("/book", payload);
      setBook(data);
      setBooks((prev) => [data, ...prev]);
      toast.success("Kitob muvaffaqiyatli qo'shildi");
      return true;
    } catch (error) {
      console.error("Kitob yaratishda xatolik:", error);
      toast.error("Kitob yaratishda xatolik yuz berdi");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getBook = async (id: number) => {
    try {
      const { data } = await axiosInstance.get(`/book/${id}`);
      setBook(data);
    } catch (error) {
      console.error("Kitobni olishda xatolik:", error);
      toast.error("Kitobni olishda xatolik yuz berdi");
    }
  };

  const filterBooks = async (value: string | number, filterType: "category" | "author" | "date" | "price") => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/book/filter/${filterType}/${value}`);
      setBooks(data);
    } catch (error) {
      console.error(`Filtrlashda xatolik (${filterType}):`, error);
      toast.error("Kitoblarni filtrlashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await axiosInstance.delete(`/book/${id}`);
      setBooks((prev) => prev.filter((item) => item.id !== id));
      toast.success("Kitob muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error("Kitobni o'chirishda xatolik:", error);
      toast.error("Kitobni o'chirishda xatolik yuz berdi");
    }
  };

  const editBook = async (id: number, formData: Partial<BookData>): Promise<boolean> => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        pageSize: formData.pageSize !== undefined ? Number(formData.pageSize) : undefined,
        price: formData.price !== undefined ? Number(formData.price) : undefined
      };

      const { data } = await axiosInstance.patch(`/book/${id}`, payload);
      setBook(data);
      setBooks((prev) => prev.map((item) => (item.id === id ? data : item)));
      toast.success("Kitob muvaffaqiyatli yangilandi");
      return true;
    } catch (error) {
      console.error("Kitobni yangilashda xatolik:", error);
      toast.error("Kitobni yangilashda xatolik yuz berdi");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider
      value={{
        book,
        setBook,
        handleCreateBook,
        books,
        setBooks,
        getBook,
        fetchBooks,
        filterBooks,
        deleteBook,
        editBook,
        loading,
        setLoading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const UseBook = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("This context only use with BookProvider");
  return context;
};

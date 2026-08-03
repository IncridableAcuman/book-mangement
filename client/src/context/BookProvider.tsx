import React, { createContext, useContext, useEffect, useState } from "react";
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
  handleCreateBook: (data: BookData) => void;
  getBook: (id: number) => void;
  filterBooks: (value: string | number, category: string) => void;
  deleteBook: (id: number) => void;
  editBook: (id: number, data: BookData) => void;
};

const BookContext = createContext<BookContextType | null>(null);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [book, setBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateBook = async (formData: BookData) => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.post("/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBook(data);
      console.log(data)
      toast.success("Muvofaqqiyatli yaratildi");
    } catch (error) {
      console.log(error);
      toast.error("Kitob yaratishda xatolik");
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const { data } = await axiosInstance.get("/book");
        setBooks(data);
      } catch (error) {
        console.log(error);
        toast.error("Kitoblarni olishda xatolik");
      }
    };
    fetchBookList();
  }, []);

  const getBook = async (id: number) => {
    try {
      const { data } = await axiosInstance(`/book/${id}`);
      setBook(data);
    } catch (error) {
      console.log(error);
      toast.error("Kitobni olishda xatolik");
    }
  };
  const filterBooks = async (value: string | number, category: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/book/filter/${category}/${value}`,
      );
      setBooks(data);
    } catch (error) {
      console.log(error);
      toast.error("Kibotlarni muallif bilan olishda xatolik");
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await axiosInstance.delete(`/book/${id}`);
      books.filter((book) => book.id !== id);
      toast.success("Muvofaqqiyatli o'chirildi");
    } catch (error) {
      console.log(error);
      toast.error("Kitobni o'chirishda xatolik yuz berdi");
    }
  };

  const editBook = async (id: number, formData: BookData) => {
    try {
      const { data } = await axiosInstance.patch(`/book/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBook(data);
      toast.success("Muvofaqqiyatli yangilandi");
    } catch (error) {
      console.log(error);
      toast.error("Kitobni yangilashda xatolik");
    }
  };

  return (
    <>
      <BookContext.Provider
        value={{
          book,
          setBook,
          handleCreateBook,
          books,
          setBooks,
          getBook,
          filterBooks,
          deleteBook,
          editBook,
          loading,
          setLoading,
        }}
      >
        {children}
      </BookContext.Provider>
    </>
  );
};

export const UseBook = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error("This context only use with Book Provider");
  return context;
};

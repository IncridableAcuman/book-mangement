import React, { createContext, useState } from "react";
import type IBook from "../interface/book.interface";

type BookContextType = {
  book: IBook | null;
  setBook: (book: IBook | null) => void;
};

const BookContext = createContext<BookContextType | null>(null);

const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [book, setBook] = useState<IBook | null>(null);
  return (
    <>
      <BookContext.Provider value={{ book, setBook }}>
        {children}
      </BookContext.Provider>
    </>
  );
};

export default BookProvider;

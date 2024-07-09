import React from "react";
import Book from "./Book";

const BookList = ({ books, onSelectBook }) => {
  if (books.length === 0) {
    return <p className="text-center text-gray-600">No books found.</p>;
  }

  return (
    <div className="book-list grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {books.map((book) => (
        <Book key={book.id} book={book} onSelectBook={onSelectBook} />
      ))}
    </div>
  );
};

export default BookList;

import React, { useEffect, useState } from "react";
import ListBooks from "../components/ListBooks";

export default function MyBookList() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const savedBookList = JSON.parse(localStorage.getItem("bookList")) || [];
    const ratings = JSON.parse(localStorage.getItem("ratings")) || {};

    const updatedBookList = savedBookList.map((book) => ({
      ...book,
      userRating: ratings[book.id]?.userRating || 0,
    }));

    setBookList(updatedBookList);
  }, []);

  function handleDeleteRead(id) {
    const updatedBookList = bookList.filter((book) => book.id !== id);
    setBookList(updatedBookList);
    localStorage.setItem("bookList", JSON.stringify(updatedBookList));
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Book List</h2>
      {bookList.length === 0 ? (
        <p className="text-center text-gray-600">
          You have no books in your list. Start adding some!
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookList.map((book) => (
            <ListBooks
              key={book.id}
              book={book}
              rating={book.userRating}
              onDelete={handleDeleteRead}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

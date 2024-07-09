import { useState, useEffect } from "react";

const KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export function useBooks(query) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      setError(null);

      try {
        const subjects = [
          "science",
          "history",
          "biography",
          "philosophy",
          "technology",
        ];
        const randomSubject =
          subjects[Math.floor(Math.random() * subjects.length)];

        const url = query
          ? `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&key=${KEY}`
          : `https://www.googleapis.com/books/v1/volumes?q=subject:${randomSubject}&orderBy=relevance&maxResults=24&key=${KEY}`;

        const res = await fetch(url);

        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        setBooks(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, [query]);

  return { books, isLoading, error };
}

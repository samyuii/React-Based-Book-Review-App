import { useState, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useBooks } from "../hooks/useBooks";
import { useDebounce } from "../hooks/useDebounce";
import Search from "../components/Search";
import BookList from "../components/BookList";
import BookDetails from "../pages/BookDetails";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const debouncedQuery = useDebounce(query, 500);
  const { books, isLoading, error } = useBooks(debouncedQuery);
  const [read, setRead] = useLocalStorageState([], "read");
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    async function fetchRecommendedBooks() {
      try {
        const res = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=subject:fiction"
        );
        const data = await res.json();
        setRecommendedBooks(data.items || []);
      } catch (err) {
        console.error("Failed to fetch recommended books:", err);
      }
    }
    fetchRecommendedBooks();
  }, []);

  function handleSelectBook(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseBook() {
    setSelectedId(null);
  }
  function handleAddRead(book) {
    setRead((prevRead) => {
      if (prevRead.some((b) => b.id === book.id)) {
        return prevRead;
      }
      const updatedRead = [...prevRead, book];
      localStorage.setItem("read", JSON.stringify(updatedRead));
      return updatedRead;
    });
  }

  function handleDeleteRead(id) {
    setRead((read) => read.filter((book) => book.id !== id));
  }

  useEffect(() => {
    const storedRead = JSON.parse(localStorage.getItem("read")) || [];
    setRead(storedRead);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Search query={query} setQuery={setQuery} />
      <NumResults books={books} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <>
              {books.length === 0 && query === "" ? (
                <BookList
                  books={recommendedBooks}
                  onSelectBook={handleSelectBook}
                />
              ) : (
                <BookList books={books} onSelectBook={handleSelectBook} />
              )}
            </>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        {selectedId && (
          <BookDetails
            selectedId={selectedId}
            onCloseBook={handleCloseBook}
            onAddRead={handleAddRead}
            read={read}
          />
        )}
      </Main>
    </div>
  );
}

function NumResults({ books }) {
  return (
    <p className="mb-4 text-lg">
      Found <strong>{books.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="bg-white p-4 rounded shadow-lg">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        className="mb-2 text-xl text-blue-600 focus:outline-none"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

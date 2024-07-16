import { useState, useRef, useEffect } from "react";
import { useKey } from "../hooks/useKey";
import { useDebounce } from "../hooks/useDebounce";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedQuery = useDebounce(query, 500);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) {
      setQuery(inputEl.current.value);
      setSuggestions([]);
      setIsFetchingSuggestions(false);
    }
  });

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${debouncedSearchTerm}`
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data.items || []));
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.items || []);
          setIsFetchingSuggestions(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setSearchTerm(title);
    setSuggestions([]);
    setIsFetchingSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsFetchingSuggestions(true);
  };

  const handleSearchClick = () => {
    setQuery(searchTerm);
    setSuggestions([]);
    setIsFetchingSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition duration-200 ease-in-out">
        <input
          className="w-full p-4 pr-12 bg-white rounded-lg focus:outline-none"
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleInputChange}
          ref={inputEl}
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-0 top-0 h-full flex items-center justify-center p-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l5.388 5.387a1 1 0 01-1.414 1.414l-5.388-5.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {suggestions.length > 0 && isFetchingSuggestions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion.volumeInfo.title)}
            >
              {suggestion.volumeInfo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

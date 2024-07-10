import { useState, useRef, useEffect } from "react";
import { useKey } from "../hooks/useKey";
import { useDebounce } from "../hooks/useDebounce";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length > 2 && shouldFetch) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.items || []));
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, shouldFetch]);

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setSuggestions([]);
    setShouldFetch(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShouldFetch(true);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleInputChange}
        ref={inputEl}
      />
      {suggestions.length > 0 && (
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

import { useState, useRef, useEffect } from "react";
import { useKey } from "../hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.items || []));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="relative">
      <input
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => setQuery(suggestion.volumeInfo.title)}
            >
              {suggestion.volumeInfo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

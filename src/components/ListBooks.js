import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

export default function ListBooks({ book, rating, onDelete }) {
  const navigate = useNavigate();
  const { volumeInfo } = book;
  const { title, imageLinks, publishedDate, authors } = volumeInfo;

  return (
    <li
      className="relative p-4 bg-white rounded-lg shadow-lg border-l-4 border-blue-500 hover:border-blue-600 transition-transform transform hover:-translate-y-1 hover:shadow-xl cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <button
        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(book.id);
        }}
      >
        ✕
      </button>
      <img
        className="w-full h-48 object-cover rounded-t-md"
        src={imageLinks?.thumbnail}
        alt={`${title} cover`}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-400">
          {authors?.join(", ")}
        </p>
        <p className="text-gray-700 dark:text-gray-400">
          Published: {publishedDate}
        </p>
        {rating !== undefined && (
          <div className="flex items-center mt-2">
            <StarRating
              maxRating={5}
              size={24}
              onSetRating={() => {}}
              initialRating={rating}
              readOnly
            />
          </div>
        )}
      </div>
    </li>
  );
}

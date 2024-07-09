import { useNavigate } from "react-router-dom";

export default function Book({ book }) {
  const navigate = useNavigate();
  const { volumeInfo } = book;
  const { title, imageLinks, publishedDate, authors } = volumeInfo;

  return (
    <li
      className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/book/${book.id}`)}
      onKeyPress={(e) => e.key === "Enter" && navigate(`/book/${book.id}`)}
      tabIndex={0}
      role="button"
    >
      <img
        className="w-full h-48 object-cover rounded"
        src={imageLinks?.thumbnail}
        alt={`${title} cover`}
      />
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{authors?.join(", ")}</p>
        <p className="text-gray-600">Published: {publishedDate}</p>
      </div>
    </li>
  );
}

import { useState, useEffect } from "react";

const StarRating = ({
  maxRating,
  size,
  onSetRating,
  initialRating,
  readOnly,
}) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [tempRating, setTempRating] = useState();

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleMouseEnter = (rate) => {
    if (!readOnly) setTempRating(rate);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setTempRating(0);
  };

  const handleClick = (rate) => {
    if (!readOnly) {
      setRating(rate);
      onSetRating(rate);
    }
  };

  return (
    <div className="flex space-x-1" role="radiogroup" aria-label="Star Rating">
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          size={size}
          filled={index + 1 <= (tempRating || rating)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};

const Star = ({ size, filled, onMouseEnter, onMouseLeave, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    className={`cursor-pointer ${filled ? "text-yellow-500" : "text-gray-400"}`}
    width={size}
    height={size}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    role="radio"
  >
    <path
      fillRule="evenodd"
      d="M10 15l-5.878 3.09 1.122-6.545L.49 7.545l6.561-.955L10 1l2.949 5.59 6.561.955-4.754 4.09 1.122 6.545z"
      clipRule="evenodd"
    />
  </svg>
);

export default StarRating;

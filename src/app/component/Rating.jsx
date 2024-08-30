import React, { useState } from "react";

const Rating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Rendera stjärnorna */}
      <div>
        {Array.from({ length: totalStars }, (_, index) => (
          <Star
            key={index}
            filled={index < rating}
            onClick={() => handleRating(index + 1)}
          />
        ))}
      </div>
      <div>

        <p>
          Your rating: {rating} / {totalStars}
        </p>
      </div>
    </div>
  );
};

const Star = ({ filled, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{ cursor: "pointer", color: filled ? "gold" : "gray" }}
    >
      ★
    </span>
  );
};
export default Rating;

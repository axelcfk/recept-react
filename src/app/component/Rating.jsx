import React, { useState } from "react";

const Rating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div>
      {/* Rendera stjärnorna */}
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleRating(index + 1)}
        />
      ))}
      <p>
        Your rating: {rating} / {totalStars}
      </p>
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

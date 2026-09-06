import React from "react";
import { FaStar } from "react-icons/fa";

export default function RatingComponent({ rating, setRating }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              className="hidden"
              rating={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              size={20}
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              //   color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              //   onMouseEnter={() => setHover(ratingValue)}
              //   onMouseLeave={() => setRating(null)}
              className="cursor-pointer transition-all duration-300 hover:border-[#ffc107]"
            />
          </label>
        );
      })}
    </div>
  );
}

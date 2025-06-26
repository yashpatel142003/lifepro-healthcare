import React from 'react';
import './StarRating.css';

const StarRating = ({ name, value, onChange, maxStars = 5, label, error, className = '' }) => {
  return (
    <div className={`star-rating-container ${className}`}>
      {label && <label className="star-rating-label">{label}</label>}
      <div className="stars">
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              className={`star ${starValue <= value ? 'selected' : ''}`}
              onClick={() => onChange(name, starValue)}
              aria-label={`${starValue} out of ${maxStars} stars`}
              role="radio"
              aria-checked={starValue === value}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(name, starValue);
                }
              }}
            >
              &#9733;
            </span>
          );
        })}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default StarRating;
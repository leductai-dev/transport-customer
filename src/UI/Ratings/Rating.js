import React, { useState } from "react";

const Rating = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <>
      <span className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => {
                console.log("rating", index);
                setRating(index);
                props.onClickHandler(index);
              }}
              // onChange={props.onChangeHandler}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </span>
    </>
  );
};

export default Rating;

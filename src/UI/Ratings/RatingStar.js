import react, { useState, useEffect } from "react";
const StarRating = (props) => {
  let stars = null;
  const [rating, setRating] = useState(null);

  useEffect(() => {
    if (typeof props.rating === "string") {
      setRating(parseInt(props.rating));
    } else {
      setRating(props.rating);
    }
  }, [props.rating]);

  if (rating !== null) {
    if (rating === 1) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
        </>
      );
    } else if (rating > 1 && rating < 2) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-half"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
        </>
      );
    } else if (rating === 2) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
        </>
      );
    } else if (rating > 2 && rating < 3) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-half"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
        </>
      );
    } else if (rating === 3) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-o"></span>
          <span className="fa fa-star-o"></span>
        </>
      );
    } else if (rating > 3 && rating < 4) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-half"></span>
          <span className="fa fa-star-o"></span>
        </>
      );
    } else if (rating === 4) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-o"></span>
        </>
      );
    } else if (rating > 4 && rating < 5) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star-half"></span>
        </>
      );
    } else if (rating === 5) {
      stars = (
        <>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </>
      );
    }
  }

  return <>{stars}</>;
};

export default StarRating;

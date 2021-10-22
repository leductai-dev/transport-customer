import React, { useEffect, useState } from "react";
// import { getReviews } from "./singleCourseDB";
import RatingStar from "../../../UI/Ratings/RatingStar";
import Spinner from "../../../UI/Spinner/Spinner";
const StudentFeedbackList = (props) => {
  const [reviews, setReviews] = useState(null);
  const [allReviews, setAllReviews] = useState(null);
  const [size, setSize] = useState(5);

  useEffect(() => {
    if (props.reviews !== null) {
      setAllReviews(props.reviews);
      let revs = props.reviews.slice(0, size);
      setReviews(revs);
    }
  }, [props.reviews, size]);

  const showNextReviews = () => {
    setSize((prevState) => {
      return prevState + 5;
    });
  };

  let reviewsList = null;
  if (reviews === null) {
    reviewsList = <Spinner />;
  } else if (reviews.length === 0) {
    reviewsList = <p>No Reviews Yet</p>;
  } else {
    reviewsList = reviews.map((review, i) => {
      return (
        <div className="review-card" key={i}>
          <div className="row">
            <div className="col-sm-1 col-md-1">
              <img className="img" src="/images/1.jpg" alt="" />
            </div>
            <div className="col-sm-11 col-md-11">
              <p className="r-name">
                {review.username}
                {/* {review.rating} */}
                <span>
                  <RatingStar rating={review.rating} />
                </span>
              </p>
              <p className="r-date">
                {new Date(parseInt(review.uploadedDT)).toLocaleDateString()}
              </p>
              <p className="r-para">
                {review.reviewTitle} - {review.reviewContent}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  let btnUi = null;
  if (allReviews !== null) {
    if (allReviews.length > 5 && reviews.length < allReviews.length) {
      btnUi = (
        <button type="button" className="review_btn" onClick={showNextReviews}>
          View More Review
        </button>
      );
    } else if (allReviews.length === 0) {
      btnUi = null;
    } else {
      btnUi = <p>No More Reviews</p>;
    }
  }

  return (
    <>
      <div className="review">
        <h3>
          Reviews &nbsp; ({props.reviews !== null && props.reviews.length})
        </h3>
        {reviewsList}
        {/* <!--------------------/ /------------------------> */}
        {btnUi}
      </div>
    </>
  );
};
export default StudentFeedbackList;

import React from "react";
import RatingStar from "../../UI/Ratings/RatingStar";

const UserReview = (props) => {
  return (
    <div className="user-rev">
      <h4>Your Review</h4>
      <div className="row ">
        <p className="date">
          Updated on&ensp;
          <span>
            {new Date(parseInt(props.review.uploadedDT)).toLocaleDateString()}
          </span>
        </p>
        <p className="controls">
          <span
            className="edit"
            onClick={() => props.updateReview(props.review)}
          >
            <i class="fas fa-pen"></i>
          </span>
          <span className="delete" onClick={() => props.deleteReview()}>
            <i class="far fa-trash-alt"></i>
          </span>
        </p>
      </div>
      <p className="review">
        {props.review.reviewTitle}&ensp;-&ensp;{props.review.reviewContent}
      </p>
      <p className="card-text">
        <RatingStar rating={props.review.rating} />
      </p>
    </div>
  );
};

export default UserReview;

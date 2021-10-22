import React, { useState, useEffect } from "react";
import CourseReview from "./CourseReview";
import Rating from "../../../UI/Ratings/Rating";
import UserReview from "../../../UI/SingleUserReview/UserReview";
import { addReview, deleteReview, getReviews } from "./singleCourseDB";

import StudentFeedbackList from "./StudentFeedback";

const CourseAddReview = (props) => {
  const [reviewDet, setReviewDet] = useState({
    rating: -1,
    reviewTitle: "",
    reviewContent: "",
    uploadedDT: ""
  });
  // if false, no need to show the user review, only show the
  // form, else true, then show user review, no form,
  // then in useEffect, need to check if the review is already given
  const [review, setReview] = useState(false);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    // console.log("ongoingCourse", props.ongoingCourse);
    if (props.ongoingCourse !== null) {
      let reviewDet = props.ongoingCourse.reviewDet;
      if (
        reviewDet !== null &&
        reviewDet !== undefined &&
        reviewDet.reviewContent !== ""
      ) {
        // setting user review from ongoingCourse
        setReview(reviewDet);
        console.log("getReviews-CourseAddReview");
      }

      getReviews(
        (revs) => {
          console.log("reviews", revs);
          setReviews(revs);
        },
        props.course.subcategoryId,
        props.course.id,
        props.authCtx
      );
    }
  }, [
    props.ongoingCourse,
    props.course.subcategoryId,
    props.course.id,
    props.authCtx
  ]);

  const onChangeHandler = (e) => {
    // console.log("addReview", e.target.value);
    setReviewDet((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("reviewDet", reviewDet);
    // set to db
    if (reviewDet.rating <= 0) {
      alert("Select rating to save your review!!!");
    } else if (reviewDet.reviewTitle === "") {
      alert("Title Missing!!!");
    } else if (reviewDet.reviewContent === "") {
      alert("Don't miss to ask question!!!");
    } else {
      addReview(
        props.authCtx,
        props.ongoingCourse,
        props.course,
        reviewDet,
        (review) => {
          console.log("addReview-callback", review);
          setReview({
            ...review
          });

          setReviews((prev) => {
            let reviewsList = prev;
            let index = reviewsList.findIndex((rev) => {
              return rev.userId === props.authCtx.user.id;
            });
            if (index === -1) {
              // no reviews yet
              let data = {
                ...review,
                userId: props.authCtx.user.id,
                username: props.authCtx.user.name
              };
              return [data];
            } else {
              // already reviews are there
              reviewsList[index] = {
                ...review,
                userId: props.authCtx.user.id,
                username: props.authCtx.user.name
              };
              return [...reviewsList];
            }
          });
        },
        reviews
      );
    }

    // reset the state
    setReviewDet((prev) => {
      return {
        rating: -1,
        reviewTitle: "",
        reviewContent: ""
      };
    });
  };

  const updateReviewHandler = (rev) => {
    console.log("update", rev);
    setReview(false);
    setReviewDet(rev);
  };

  const deleteReviewHandler = () => {
    deleteReview(
      props.authCtx,
      props.ongoingCourse,
      props.course,
      reviews,
      (revs) => {
        setReviews(revs);
        setReview(false);
        setReviewDet({
          rating: -1,
          reviewTitle: "",
          reviewContent: "",
          uploadedDT: ""
        });
      }
    );
  };

  // let ui = null;
  // if (review === false) {
  // }

  return (
    <>
      <div class="user_review">
        <CourseReview reviews={reviews} />
        <StudentFeedbackList reviews={reviews} />
      </div>
      {props.ongoingCourse !== null && props.ongoingCourse.isCourseCompleted && (
        <>
          {review === false ? (
            <div class="review-box">
              <h3>Add Reviews & Rate</h3>
              <p>
                What is it like to Course?&emsp;&emsp;
                <Rating
                  onClickHandler={(rating) =>
                    setReviewDet((prev) => {
                      return {
                        ...prev,
                        rating: rating
                      };
                    })
                  }
                />
              </p>
              <form class="form-group" method="post" onSubmit={onSubmitHandler}>
                <label for="title" style={{ cursor: "pointer" }}>
                  Review Title
                </label>
                <br />
                <input
                  class="text_box"
                  type="text"
                  id="title"
                  name="reviewTitle"
                  value={reviewDet.reviewTitle}
                  onChange={onChangeHandler}
                />
                <br />
                <label for="content" style={{ cursor: "pointer" }}>
                  Review Content
                </label>
                <br />
                <textarea
                  class="text_box ht148"
                  type="text"
                  name="reviewContent"
                  value={reviewDet.reviewContent}
                  onChange={onChangeHandler}
                  id="content"
                ></textarea>
                <br />
                <button type="submit" class="review_btn">
                  Submit Review&ensp;&#8594;
                </button>
              </form>
            </div>
          ) : (
            <UserReview
              review={review}
              deleteReview={deleteReviewHandler}
              updateReview={updateReviewHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default CourseAddReview;

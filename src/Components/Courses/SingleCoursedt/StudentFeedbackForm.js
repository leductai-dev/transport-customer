import React from "react";
const StudentFeedbackForm = () => {
  return (
    <>
      <div className="review-box">
        <h3>Add Reviews & Rate</h3>
        <p>
          What is it like to Course?&emsp;&emsp;
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </p>
        <form className="form-group" action="#" method="post">
          <label for="title" style={{ cursor: "pointer" }}>
            Review Title
          </label>
          <br />
          <input className="text_box" type="text" id="title" />
          <br />
          <label for="content" style={{ cursor: "pointer" }}>
            Review Content
          </label>
          <br />
          <textarea
            className="text_box ht148"
            type="text"
            id="content"
          ></textarea>
          <br />
          <button type="submit" className="review_btn">
            Submit Review&ensp;&#8594;
          </button>
        </form>
      </div>
    </>
  );
};
export default StudentFeedbackForm;

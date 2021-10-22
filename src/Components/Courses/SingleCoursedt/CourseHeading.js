import React from "react";

const Testimonal = (props) => {
  // console.log(props.course);
  const facs = [];
  props.course.faculties.forEach((fac) => {
    let index = fac.lastIndexOf("?");
    let fa = fac.substring(index + 1);
    facs.push(fa);
    // console.log("fac", fa);
  });

  const shareCourse = async () => {
    navigator
      .share({
        url: window.location.href
      })
      .then(() => {
        console.log("Sharing successfull");
      })
      .catch(() => {
        console.log("Sharing failed");
      });
  };

  return (
    <>
      <section
        className="navbar_sect"
        // style={{ backgroundImage: "url(/images/bg4.jpg)" }}
        style={{
          backgroundImage: `url(https://secure--storage.s3.ap-south-1.amazonaws.com/${props.course.coverImg})`
        }}
      >
        <div className="course_details">
          <div className="inner_container">
            <p className="course_header">
              <img className="header_img" src="/images/4.jpg" alt="..." />
              <span className="instructor_name">{facs.join()}</span>
              <span className="upload_date">
                Last updated&nbsp;<span className="date">02/08/2021</span>
              </span>
            </p>
            <p class="cat">
              {props.course.category}&nbsp;
              <small>(category)</small>,&ensp;{props.course.subcategory}&nbsp;
              <small>(sub-category)</small>
            </p>
            <p class="iname">
              <small>Provided By</small>&nbsp;
              {props.course.instituteName}&nbsp;
              {/* <small>(institution name)</small> */}
            </p>
            <p className="course_title">
              {/* Designing a Online Course Website for education purpose */}
              {props.course.courseName}
            </p>
            {/* <p className="course_body">
                <span className="course_tag">Best Seller</span>
                <span className="course_rating">
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="rating_value">4.5</span>
                  <span className="rating_count">(1,432 Ratings)</span>
                </span>
              </p> */}
            <p className="course_footer">
              {/* <a className="students_count" href="#s">
                  <i className="far fa-user"></i>&ensp;
                  {props.course.noOfStudents}&nbsp;
                  <span>students enrolled&emsp;</span>
                </a>
                <a className="review_count" href="#r">
                  <i className="far fa-comment-alt"></i>&ensp;25&nbsp;
                  <span>Reviews</span>
                </a> */}
              <span className="flt_rt">
                {/* <i
                      onClick={() => bookmarkCourse(props.course)}
                      className={isBookmarked ? "fas fa-heart" : "far fa-heart"}
                      >
                      <span style={{ fontWeight: "normal !important" }}>
                      &ensp;Add to Wishlist
                     </span>
                   </i>  */}
                <button
                  type="button"
                  className="share"
                  id="#shareBtn"
                  onClick={shareCourse}
                >
                  <i className="fas fa-share-alt"></i>&ensp;Share
                </button>
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Testimonal;

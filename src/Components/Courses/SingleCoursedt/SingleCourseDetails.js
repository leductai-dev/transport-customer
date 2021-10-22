import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import localforage from "localforage";
import $ from "jquery";
import CourseOverview from "./CourseOverview";
import CourseContent from "./CourseContent";
import StudentFeedbackList from "./StudentFeedback";
// import StudentFeedbackForm from "./StudentFeedbackForm";
import CourseReview from "./CourseReview";
import CoursePriceBox from "./CoursePriceBox";
import CourseFeatures from "./CourseFeatures";
import CourseHeading from "./CourseHeading";
// import CarouselView from "../../../Reusable/CarouselView";
import "../../../styles.css";
// import CoursesContext from "../../../Context/courses-context";
import Spinner from "../../../UI/Spinner/Spinner";
import { getReviews } from "./singleCourseDB";
// import PdfViewer from "../../../UI/PdfViewer/PdfViewer";
// import { getCourse } from "./singleCourseDB";
// import PaymentModal from "./PaymentModal";

// A custom hook that builds on useLocation to parse
// the query string for you.
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// let subcategoryId = null;
const SingleCourseDetials = (props) => {
  const [noOfLectures, setNoOfLectures] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [reviews, setReviews] = useState(null);

  // check in local, whether the courseId is available or not
  // if it is not there, then
  // get sections, topics, materials, quiz data from server
  // and populate to store in indexedDB
  // if the courseId is in indexedDB, then get that data
  // and set section state

  useEffect(() => {
    if (props.course !== null) {
      getReviews(
        (revs) => {
          // console.log("reviews", revs);
          setReviews(revs);
        },
        props.course.subcategoryId,
        props.course.id,
        props.authCtx
      );
    }
  }, [props.course]);

  $(document).ready(function () {
    $("#vbn").bind("contextmenu", function () {
      return false;
    });
  });

  let courseView = null;
  if (props.course === null) {
    courseView = <Spinner />;
  } else {
    courseView = (
      <>
        <CourseHeading course={props.course} />
        <div className="crs_sl">
          <div className="container-fluid">
            <div className="row">
              {/* <PaymentModal /> */}
              <div className="col-sm-5 col-lg-4 col-xl-3">
                <CoursePriceBox
                  totalHours={totalHours}
                  course={props.course}
                  subcategoryId={props.subcategoryId}
                />
                <CourseFeatures
                  totalHours={totalHours}
                  course={props.course}
                  noOfLectures={noOfLectures}
                />
              </div>
              <div className="col-sm-7 col-lg-8 col-xl-9">
                <div className="demo_video">
                  <video id="vbn" controls controlsList="nodownload">
                    <source
                      src={`https://secure--storage.s3.ap-south-1.amazonaws.com/${props.course.introVideo}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  {/* <PdfViewer /> */}
                </div>
                <CourseOverview course={props.course} />
                <CourseContent
                  course={props.course}
                  noOfLectures={noOfLectures}
                  totalHours={totalHours}
                  setNoOfLectures={(num) => setNoOfLectures(num)}
                  setTotalHours={(num) => setTotalHours(num)}
                  // courseId={params.courseId}
                  // subcategoryId={subcategoryId}
                />
                <div className="course_review">
                  <CourseReview reviews={reviews} />
                  <StudentFeedbackList reviews={reviews} />
                </div>
                {/* <StudentFeedbackForm /> */}
              </div>
            </div>
          </div>
        </div>
        <section className="rltd_crs">{/* <CarouselView /> */}</section>
      </>
    );
  }

  return <>{courseView}</>;
};
export default SingleCourseDetials;

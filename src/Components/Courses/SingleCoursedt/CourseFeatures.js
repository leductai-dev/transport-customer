import React from "react";
const CourseFeatures = (props) => {
  return (
    <>
      <div className="course-feature">
        <ul className="list-group">
          <h4 className="title">Course Features</h4>
          <li>
            Lectures <span className="float-right">{props.noOfLectures}</span>
          </li>
          {/* <li>
            Pdfs <span className="float-right">1</span>
          </li> */}
          <li>
            Duration{" "}
            <span className="float-right">
              {props.totalHours.toFixed(0)} hours
            </span>
          </li>
          {/* <li>
            Skill level <span className="float-right">All level</span>
          </li> */}
          <li>
            Language
            <span
              className="float-right"
              style={{ textTransform: "capitalize" }}
            >
              {props.course.lang}
            </span>
          </li>
          <li>
            Assessments{" "}
            <span className="float-right">
              {props.course.assessments === "Yes" ? "Yes" : "No"}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
export default CourseFeatures;

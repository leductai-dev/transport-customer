import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import CoursesContext from "../../../Context/courses-context";
import RatingStar from "../../../UI/Ratings/RatingStar";

const CourseCard = (props) => {
  const history = useHistory();
  const ctx = useContext(CoursesContext);
  useEffect(() => {
    console.log("course", props.course);
  }, []);

  const courseUpdate = () => {
    // console.log("coursecard", course, course.subcategoryId);
    let course = props.course;
    console.log("course", course);
    ctx.setCourse(course);
    history.push(
      `/dashboard/courses/${course.id}?category=${course.category}&subcategory=${course.subcategory}&subcategoryId=${course.subcategoryId}`
    );
  };

  return (
    <div class="add" onClick={courseUpdate}>
      <div class="row m-0">
        <div class="col-sm-4 col-md-3 p-0">
          <div class="thumb">
            <img
              class="img-fluid"
              src={`https://secure--storage.s3.ap-south-1.amazonaws.com/${props.course.thumbnail}`}
              alt={props.course.courseName}
            />
            <div class="overlay">
              <button type="submit" class="btn">
                Continue
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-8 col-md-9">
          <h4>
            Category: {props.course.category.toUpperCase()}, Subcategory:{" "}
            {props.course.subcategory.toUpperCase()}
          </h4>
          <p class="completed">
            <span class="percent">{props.course.completedPercent}</span>
            %&ensp;Completed
          </p>
          <p class="title">Title: {props.course.courseName}</p>
          <p class="about">Description: {props.course.description}</p>
          <div class="footer">
            <p>
              <i class="far fa-user"></i>
              <small class="value">{props.course.noOfStudents}</small>
            </p>
            {/* <p>
              <i class="far fa-comment-alt"></i>
              <small class="value">25</small>
            </p> */}
            <p>
              {props.course.totalRating !== undefined ? (
                <>
                  <RatingStar rating={props.course.totalRating} />
                  &nbsp;
                  <small class="value">({props.course.totalRating})</small>
                </>
              ) : (
                <>
                  <RatingStar rating={2.5} />
                  &nbsp;
                  <small class="value">(2.5)</small>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

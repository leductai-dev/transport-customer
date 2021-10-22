import React, { useContext, useEffect } from "react";
import AuthContext from "../../../Context/auth-context";
import CoursesContext from "../../../Context/courses-context";
import RatingStar from "../../../UI/Ratings/RatingStar";
import { removeBookmark } from "../../Courses/CoursesDB";

const CourseCard = (props) => {
  let course = props.course;
  let ctx = useContext(CoursesContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log("bookmark card", props.course);
  }, []);

  const courseUpdate = (course) => {
    ctx.setCourse(course);
    props.history.push(
      `/dashboard/courses/${course.id}?category=${course.category}&subcategory=${course.subcategory}&subcategoryId=${course.subcategoryId}`
    );
  };

  const removeBookmarkItem = (course) => {
    let user = authCtx.user;
    let bookmark = user.bookmarks;
    let index = bookmark.findIndex((bm) => bm.id === course.id);
    bookmark.splice(index, 1);
    removeBookmark(user, course);
    authCtx.setUser({
      ...user,
      bookmarks: bookmark
    });
  };

  const facs = [];
  if (props.course !== undefined && props.course !== null) {
    props.course.faculties.forEach((fac) => {
      let index = fac.lastIndexOf("?");
      let fa = fac.substring(index + 1);
      facs.push(fa);
      // console.log("fac", fa);
    });
  }

  return (
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <div class="card">
        <div class="thumb">
          <img
            class="card-img"
            src={`https://secure--storage.s3.ap-south-1.amazonaws.com/${course.coverImg}`}
            alt={course.courseName}
          />
          <div class="fav" onClick={() => removeBookmarkItem(course)}>
            <span>
              <i
                class="far fa-minus-square"
                data-toggle="tooltip"
                data-placement="left"
                title="Remove"
              ></i>
            </span>
          </div>
          <div class="img_overlay">
            <div class="center">Preview Course</div>
          </div>
          {/* <a href="courses_single.html" class="stretched-link"></a> */}
          <div
            onClick={() => courseUpdate(course)}
            className="stretched-link"
          ></div>
        </div>
        <div class="card-body">
          <p>
            Author's Name: {facs.join()}
            <span>
              <a class="view_more" onClick={() => courseUpdate(course)}>
                view more
              </a>
            </span>
          </p>
          <h3 class="card-title">{course.courseName}</h3>
          <p class="card-text">
            {course.totalRating !== undefined ? (
              <>
                <RatingStar rating={props.course.totalRating} />
                &nbsp;
                {/* <small class="value">({props.course.totalRating})</small> */}
              </>
            ) : (
              <>
                <RatingStar rating={2.5} />
                &nbsp;
                {/* <small class="value">(2.5)</small> */}
              </>
            )}
            {/* <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span> */}
          </p>
          <hr />
          <p class="card_footer">
            <a class="sdt" href="#courses_single.html">
              <i class="far fa-user"></i>
              {props.course.noOfStudents}
            </a>
            <a class="price" href="#courses_single.html">
              <i class="fas fa-rupee-sign"></i>
              {props.course.publish.originalPrice === 0
                ? "Free"
                : props.course.publish.originalPrice}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

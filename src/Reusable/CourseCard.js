import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { addBookmark, removeBookmark } from "../Components/Courses/CoursesDB";
import AuthContext from "../Context/auth-context";
import CoursesContext from "../Context/courses-context";
import RatingStar from "../UI/Ratings/RatingStar";
// import { Link } from "react-router-dom";
const CourseCard = (props) => {
  const ctx = useContext(CoursesContext);
  const authCtx = useContext(AuthContext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const history = useHistory();

  const facs = [];
  if (props.course !== undefined && props.course !== null) {
    props.course.faculties.forEach((fac) => {
      let index = fac.lastIndexOf("?");
      let fa = fac.substring(index + 1);
      facs.push(fa);
      // console.log("fac", fa);
    });
  }

  useEffect(() => {
    // console.log("updated bookmarks", authCtx.user);
    if (authCtx.user !== null) {
      let bookmarks = authCtx.user.bookmarks;
      let index = bookmarks.findIndex((course) => {
        return course.id === props.course.id;
      });
      if (index === -1) {
        setIsBookmarked(false);
      } else {
        setIsBookmarked(true);
      }
    }
  }, [authCtx.user, props.course.id]);

  const courseUpdate = (course) => {
    // console.log("coursecard", course, course.subcategoryId);
    ctx.setCourse(course);
    history.push(
      `/dashboard/courses/${course.id}?category=${course.category}&subcategory=${course.subcategory}&subcategoryId=${course.subcategoryId}`
    );
  };

  const bookmarkCourse = (course) => {
    if (authCtx.isLoggedIn) {
      // logged in, add to db & ctx and show that in UI
      // update to ctx
      let user = authCtx.user;
      let bookmark = user.bookmarks;
      let index = bookmark.findIndex((bm) => bm.id === course.id);
      if (index === -1) {
        bookmark.push(course);
        setIsBookmarked(true);
        addBookmark(user, course);
      } else {
        bookmark.splice(index, 1);
        setIsBookmarked(false);
        removeBookmark(user, course);
      }
      authCtx.setUser({
        ...user,
        bookmarks: bookmark
      });
    } else {
      // not logged in, push to login page
      // and send this course too, so if he login
      // this should be added to db

      // let json = JSON.stringify(course);
      // console.log("json-not logged in", json);
      // props.history.push(`/login?bookmark=${json}`);
      // from login, it should moved to the
      // console.log('',props.history);
      props.history.push(`/login`);
      // for now, he can login and then he can bookmark
    }
  };

  return (
    <>
      {/* <div className="item col-sm-6 col-md-6 col-lg-4 col-xl-4"> */}
      <div className="card">
        <div className="thumb">
          <img
            className="card-img"
            src={`https://secure--storage.s3.ap-south-1.amazonaws.com/${props.course.coverImg}`}
            alt={props.course.courseName}
          />
          <div className="days">
            {props.course.types === "Online" ? (
              <div className="pill">Online</div>
            ) : (
              <div className="pill">Live</div>
            )}
          </div>
          <div className="fav">
            <span>
              <i
                onClick={() => bookmarkCourse(props.course)}
                className={isBookmarked ? "fas fa-bookmark" : "far fa-bookmark"}
              ></i>
            </span>
          </div>
          <div className="img_overlay">
            <div className="center">
              <span>Preview Course</span>
            </div>
          </div>
          {/* <a href="#c" className="stretched-link"></a> */}
          {/* <Link
              to={`${props.match.url}/courses/${props.course.CrsId}`}
              className="stretched-link"
            ></Link> */}
          <div
            onClick={() => courseUpdate(props.course)}
            className="stretched-link"
          ></div>
        </div>
        <div className="card-body">
          <p>
            Faculty: {facs.join()}
            <span>
              <a className="view_more" href="#courses">
                {props.course.subcategory}
              </a>
            </span>
          </p>
          <h3 className="card-title">{props.course.courseName}</h3>
          <p className="card-text">
            {props.course.totalRating !== undefined ? (
              <>
                <RatingStar rating={props.course.totalRating} />
                {/* {props.course.totalRating} */}
                {/* <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span> */}
              </>
            ) : (
              <>
                <RatingStar rating={2.5} />
                {/* <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span> */}
              </>
            )}
          </p>
          <hr />
          <p className="card_footer">
            <a className="sdt" href="#n">
              <i className="far fa-user"></i>
              {props.course.noOfStudents}
            </a>
            <a className="price" href="#d">
              <i className="fas fa-rupee-sign"></i>
              {props.course.publish.originalPrice === 0
                ? "Free"
                : props.course.publish.originalPrice}
            </a>
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
export default CourseCard;

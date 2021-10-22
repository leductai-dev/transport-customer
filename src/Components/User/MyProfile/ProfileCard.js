import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../Context/auth-context";

const ProfileCard = (props) => {
  const authCtx = useContext(AuthContext);
  console.log("authCtx", authCtx.user);

  const [length, setLength] = useState({
    ongoingCoursesLength: 0,
    completedCoursesLength: 0
  });

  useEffect(() => {
    if (props.authCtx.user !== null) {
      // console.log("user----", props.user);
      let courses = props.authCtx.user.ongoingCourses;
      let ong = 0;
      let com = 0;
      courses.forEach((c) => {
        if (c.isCourseCompleted) {
          com++;
        } else {
          ong++;
        }
      });
      console.log(ong, com);
      setLength({
        ongoingCoursesLength: ong,
        completedCoursesLength: com
      });
    }
  }, [props.authCtx.user]);
  // authCtx.user === null && Spinner
  return (
    <>
      {/* <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            <NavLink class="list-link" to={`${props.match.url}/myCertificates`}>
              Certifications
            </NavLink>
            // <p class="title">Certifications</p>
            <p class="counter value" data-target="1">
              0
            </p>
          </div>
          <div class="icon">
            <i class="fas fa-certificate"></i>
          </div>
        </div>
      </div> */}
      <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            {/* <p class="title">Courses</p> */}
            <NavLink class="list-link" to={`${props.match.url}/mycourses`}>
              Courses
            </NavLink>
            <p class="counter value" data-target="11">
              {/* ongoingCourses, bcs it as both the current 
              course, and completed course, which is not expired.
              If the course is completed, but its expired, then
              it will be in order only
              */}
              {authCtx.user !== null && authCtx.user.ongoingCourses.length}
            </p>
          </div>
          <div class="icon style1">
            <i class="fas fa-tv"></i>
          </div>
        </div>
      </div>

      {/* <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            <a class="list-link" href="#l">
              Reviews
            </a>
            <p class="counter value" data-target="02">
              0
            </p>
          </div>
          <div class="icon style2">
            <i class="far fa-star"></i>
          </div>
        </div>
      </div> */}

      <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            {/* <p class="title">Bookmarks</p> */}
            <NavLink class="list-link" to={`${props.match.url}/mybookmarks`}>
              Bookmarks
            </NavLink>
            <p class="counter value" data-target="98">
              {authCtx.user !== null && authCtx.user.bookmarks.length}
            </p>
          </div>
          <div class="icon style3">
            <i class="far fa-heart"></i>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            {/* <p class="title">Ongoing</p> */}
            <NavLink class="list-link" to={`${props.match.url}/mycourses`}>
              Ongoing
            </NavLink>
            <p class="counter value" data-target="4">
              {length.ongoingCoursesLength}
            </p>
          </div>
          <div class="icon style4">
            <i class="far fa-pause-circle"></i>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            {/* <p class="title">Completed</p> */}
            <NavLink class="list-link" to={`${props.match.url}/mycourses`}>
              Completed
            </NavLink>
            <p class="counter value" data-target="26">
              {length.completedCoursesLength}
            </p>
          </div>
          <div class="icon style5">
            <i class="far fa-check-circle"></i>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            <NavLink class="list-link" to={`${props.match.url}/myorder`}>
              Orders
            </NavLink>
            <p class="counter value" data-target="06">
              {authCtx.user !== null && authCtx.user.orders.length}
            </p>
          </div>
          <div class="icon style6">
            <i class="fas fa-clipboard-check"></i>
          </div>
        </div>
      </div>

      {/* <div class="col-sm-6 col-md-6 col-lg-3">
        <div class="details-box">
          <div class="details">
            <a class="list-link" href="#l">
              Others
            </a>
            <p class="counter value" data-target="99">
              0
            </p>
          </div>
          <div class="icon style7">
            <i class="fas fa-ribbon"></i>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProfileCard;

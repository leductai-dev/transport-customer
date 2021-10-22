import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AuthContext from "../../../Context/auth-context";
import CoursesContext from "../../../Context/courses-context";
import SingleCourseBought from "./SingleCourseBought";
import SingleCourseDetials from "./SingleCourseDetails";
import { getCourse } from "./singleCourseDB";
import Spinner from "../../../UI/Spinner/Spinner";
import SingleCourseLive from "./SingleCourseLive";
import { removeExpiredCourse } from "../CoursesDB";
// const SingleCourseLive = React.lazy(() => import("./SingleCourseLive"));

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let subcategoryId = null;
const CourseDetails = (props) => {
  // if course bought - singleCourseBought
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const query = useQuery();
  const ctx = useContext(CoursesContext);
  const [course, setCourse] = useState(null);
  const [courseBought, setCourseBought] = useState(null);
  const [ongoingIndex, setOngoingIndex] = useState(-1);
  const [remainingDays, setRemainingDays] = useState(-1);
  // if ctx.course is null, get the courseId and check in localDb, if it is not in localDB then get from the server
  // console.log(
  //   "singleCourse",
  //   params.courseId,
  //   ctx.course,
  //   query.get("subcategoryId")
  // );

  // check in local, whether the courseId is available or not
  // if it is not there, then
  // get sections, topics, materials, quiz data from server
  // and populate to store in indexedDB
  // if the courseId is in indexedDB, then get that data
  // and set section state

  // if course is not bought,
  // course is bought
  useEffect(() => {
    // if singlecourse page is refreshed or if it is from some other route
    subcategoryId = query.get("subcategoryId");
    if (ctx.course === null) {
      getCourse((course) => setCourse(course), params.courseId, subcategoryId);
    } else {
      setCourse(ctx.course);
    }
    // if the course is not bought
  }, []);

  useEffect(() => {
    // if the user is not signed in, then courseBought is false
    // console.log(
    //   "courseDetails",
    //   localStorage.getItem("userId"),
    //   !authCtx.isLoggedIn
    // );
    // authCtx.user --- makes optimization
    // if (authCtx.user !== null && !authCtx.isLoggedIn) {
    // localStorage.getItem("userId") - to confirm, whether the user is not logged in
    if (sessionStorage.getItem("userId") === null && !authCtx.isLoggedIn) {
      // console.log("auth no login", localStorage.getItem("userId"));
      // console.log("if");
      setCourseBought(false);
    } else if (authCtx.user !== null) {
      // if it is in ongoing courses, then it is bought else it is not
      // let courseId = ctx.course.id;
      let courseId = params.courseId;
      // console.log(
      //   "courseDetails----------------else",
      //   authCtx.user,
      //   authCtx.isLoggedIn
      // );
      let index = -1;
      if (
        authCtx.user !== null &&
        authCtx.user !== undefined &&
        authCtx.user.ongoingCourses !== undefined
      ) {
        index = authCtx.user.ongoingCourses.findIndex(
          (course) => course.id === courseId
        );
        if (index === -1) {
          // console.log("index----", index);
          setCourseBought(false);
        } else {
          // if the course is ongoingCourse, then check
          // for the courseBoughtTimestamp, with courseDuration
          let ongoingCourse = authCtx.user.ongoingCourses[index];
          console.log("ongoingCourse", ongoingCourse);
          let courseDuration = ongoingCourse.courseDuration;
          if (courseDuration === -1) {
            // lifetime access
            console.log("LifeTime Course");
            setCourseBought(true);
            setOngoingIndex(index);
          } else {
            // not lifetime, have some time period
            let courseBoughtMilli = ongoingCourse.courseBoughtTimestamp;
            // Therefore, one day is: 1000 * 60 * 60 * 24, which is 86400000 milliseconds.
            let endMilli = new Date(
              courseBoughtMilli + courseDuration * 1000 * 60 * 60 * 24
            ).getTime();
            let currentMilli = new Date().getTime();
            console.log(
              "courseBoughtTIme",
              new Date(courseBoughtMilli).toString()
            );
            console.log("currentTime", new Date(currentMilli).toString());
            console.log("endTime", new Date(endMilli).toString());
            let res = endMilli - currentMilli;
            let remainingDays = res / (60 * 60 * 24 * 1000);
            setRemainingDays(remainingDays.toFixed(0));
            // console.log("difference", remainingDays.toFixed(0));
            // res < 0, means the value is negative, which says the time crosses the limit
            if (res < 0) {
              alert("course ended!!!");
              setCourseBought(false);
              // removeFromOngoingCourse & authCtx
              removeExpiredCourse(authCtx, ongoingCourse);
            } else {
              // one day before & 5days before, show alert/msg
              // if(one day){
              // }
              // if(five day){
              // }
              console.log("courseBoughtREraefaf");
              setCourseBought(true);
              setOngoingIndex(index);
            }
          }
        }
      } else {
        // console.log("else-if");
      }
      // console.log("single details, courseBought", courseBought);
    } else {
      // console.log("else");
      setCourseBought(false);
    }
  }, [authCtx, params.courseId]);

  let ui = null;
  if (courseBought === null) {
    // console.log("courseBought---null");
    ui = <Spinner />;
  } else if (courseBought !== null && course !== null) {
    // console.log("courseBought---true/false", courseBought);
    ui = courseBought ? (
      course.types === "Live" ? (
        // <h1>Live</h1>
        <SingleCourseLive
          remainingDays={remainingDays}
          authCtx={authCtx}
          course={course}
          subcategoryId={subcategoryId}
          courseId={params.courseId}
        />
      ) : (
        <SingleCourseBought
          remainingDays={remainingDays}
          ongoingIndex={ongoingIndex}
          authCtx={authCtx}
          course={course}
          subcategoryId={subcategoryId}
          courseId={params.courseId}
        />
      )
    ) : (
      <SingleCourseDetials
        course={course}
        subcategoryId={subcategoryId}
        courseId={params.courseId}
        authCtx={authCtx}
      />
    );
  }

  return ui;
};

export default CourseDetails;

import React from "react";
import CourseList from "./CourseList";

const MyCourses = (props) => {
  return (
    <>
      {props.authCtx.user !== null && <CourseList user={props.authCtx.user} />}
    </>
  );
};

export default MyCourses;

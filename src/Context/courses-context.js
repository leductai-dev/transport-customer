import React, { useState } from "react";

// import AWS from "../Services/AWS";

const CoursesContext = React.createContext({
  course: null,
  setCourse: (course) => {}
  // courses: null,
  // setCourses: (courses) => {}
});

// const docClient = new AWS.DynamoDB.DocumentClient();

export const CoursesContextProvider = (props) => {
  const [course, setCourse] = useState(null);
  // const [courses, setCourses] = useState(null);

  // useEffect(() => {
  //   // let data = getCoursesData();
  //   // console.log(data);
  //   var params = {
  //     TableName: "Courses"
  //   };
  //   docClient.scan(params, function (err, data) {
  //     if (!err) {
  //       setCourses(data.Items);
  //     } else {
  //       console.log("courses-context.js", err);
  //     }
  //   });
  // }, []);

  const setMyCourse = (course) => {
    setCourse(course);
  };

  // const setCoursesList = (courses) => {
  //   setCourses(courses);
  // };

  return (
    <CoursesContext.Provider
      value={{
        course: course,
        setCourse: setMyCourse
        // courses: courses,
        // setCourses: setCoursesList
      }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesContext;

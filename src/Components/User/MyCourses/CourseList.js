import React, { useEffect, useState } from "react";
import { getOngoingCourses } from "../UserDB";
import CourseCard from "./CourseCard";

const CourseList = (props) => {
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    if (props.user !== null) {
      // console.log("user", props.user.ongoingCourses);
      let onCourses = props.user.ongoingCourses;
      let filteredOngoing = [];
      let filteredCompleted = [];
      getOngoingCourses(onCourses, (courses) => {
        // console.log("courses-from db", courses);
        // console.log("courses-from db", onCourses);
        courses.forEach((c) => {
          let index = onCourses.findIndex((og) => {
            return c.id === og.id;
          });
          let ong = onCourses[index];
          let updated = {
            ...c,
            ...ong
          };
          if (ong.isCourseCompleted) {
            filteredCompleted.push(updated);
          } else {
            filteredOngoing.push(updated);
          }
        });
        // console.log("fil", filteredOngoing);
        // console.log("filC", filteredCompleted);
        setOngoingCourses(filteredOngoing);
        setCompletedCourses(filteredCompleted);
        // // for filter purpose
        // setAllOngoingCourses(filteredOngoing);
        // setAllCompletedCourses(filteredCompleted);
      });
    }
  }, []);

  const getRecentOldOngoing = () => {
    if (document.getElementById("ongoing").value === "recent") {
      let ong = [...ongoingCourses];
      ong.sort((a, b) => {
        let nameA = a.courseBoughtTimestamp;
        let nameB = b.courseBoughtTimestamp;
        // console.log(nameA, nameB);
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
      setOngoingCourses(ong);
    } else if (document.getElementById("ongoing").value === "old") {
      let ong = [...ongoingCourses];
      ong.sort((a, b) => {
        let nameA = a.courseBoughtTimestamp;
        let nameB = b.courseBoughtTimestamp;
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOngoingCourses(ong);
    }
  };

  const getRecentOldCompleted = () => {
    if (document.getElementById("completed").value === "recent") {
      let ong = [...ongoingCourses];
      ong.sort((a, b) => {
        let nameA = a.courseBoughtTimestamp;
        let nameB = b.courseBoughtTimestamp;
        // console.log(nameA, nameB);
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
      setCompletedCourses(ong);
    } else if (document.getElementById("completed").value === "old") {
      let ong = [...ongoingCourses];
      ong.sort((a, b) => {
        let nameA = a.courseBoughtTimestamp;
        let nameB = b.courseBoughtTimestamp;
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setCompletedCourses(ong);
    }
  };

  let ongoingCoursesUI = null;
  let completedCoursesUI = null;
  if (ongoingCourses.length === 0) {
    ongoingCoursesUI = (
      <p style={{ padding: "5px 15px" }}>No Courses In Progress</p>
    );
  } else {
    ongoingCoursesUI = ongoingCourses.map((og) => {
      return <CourseCard course={og} key={og.id} />;
    });
  }
  if (completedCourses.length === 0) {
    completedCoursesUI = <p>Courses Are Not Completed Yet.</p>;
  } else {
    completedCoursesUI = completedCourses.map((og) => {
      return <CourseCard course={og} key={og.id} />;
    });
  }

  return (
    <>
      <div className="course-list">
        <div className="list-header">
          <h4>Ongoing</h4>
          {ongoingCourses.length !== 0 && (
            <div class="dropdown">
              <select
                name="ongoing"
                id="ongoing"
                class="dropdown-toggle"
                onChange={getRecentOldOngoing}
              >
                <option class="list-item" value="all">
                  --- Select ---
                </option>
                <option class="list-item" value="recent">
                  Recent
                </option>
                <option class="list-item" value="old">
                  Old
                </option>
              </select>
            </div>
          )}
        </div>
        <div className="courses">{ongoingCoursesUI}</div>
        <div className="end">End Of OngoingCourses</div>
      </div>

      <div className="course-list">
        <div className="list-header">
          <h4>Completed</h4>
          {completedCourses.length !== 0 && (
            <div class="dropdown">
              <select
                name="completed"
                id="completed"
                class="dropdown-toggle"
                onChange={getRecentOldCompleted}
              >
                <option class="list-item" value="all">
                  --- Select ---
                </option>
                <option class="list-item" value="recent">
                  Recent
                </option>
                <option class="list-item" value="old">
                  Old
                </option>
              </select>
            </div>
          )}
        </div>
        <div className="courses">{completedCoursesUI}</div>
        <div className="end">No More Courses</div>
      </div>
    </>
  );
};

export default CourseList;

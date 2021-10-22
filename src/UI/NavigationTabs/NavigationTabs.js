import React, { useEffect } from "react";
import CourseOverview from "../../Components/Courses/SingleCoursedt/CourseOverview";
import CourseAddReview from "../../Components/Courses/SingleCoursedt/CourseAddReview";
import CourseAssesment from "../../Components/Courses/SingleCoursedt/CourseAssesment";
import CourseCaptions from "../../Components/Courses/SingleCoursedt/CourseCaptions";
import CourseQ from "../../Components/Courses/SingleCoursedt/CourseQ";
import CourseMaterial from "../../Components/Courses/SingleCoursedt/CourseMaterial";

const NavigationTabs = (props) => {
  // useEffect(() => {
  //   console.log("topic", props.topic);
  // }, [props.topic]);
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#captions">
            Captions
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#home">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#menu1">
            Q&nbsp;&&nbsp;A
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#menu2">
            Reviews
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#menu3">
            Assessment:&nbsp;Quiz
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#menu4">
            Materials
          </a>
        </li>
      </ul>
      {/* <!-- Tab panes --> */}
      <div className="tab-content">
        <div className="tab-pane container active" id="captions">
          <CourseCaptions topic={props.topic} setCaption={props.setCaption} />
        </div>
        <div className="tab-pane container" id="home">
          <CourseOverview course={props.course} />
        </div>
        <div className="tab-pane container" id="menu1">
          <CourseQ
            topic={props.topic}
            authCtx={props.authCtx}
            currentSectionTopic={props.currentSectionTopic}
          />
        </div>
        <div className="tab-pane container" id="menu2">
          <CourseAddReview
            authCtx={props.authCtx}
            course={props.course}
            ongoingCourse={props.ongoingCourse}
          />
        </div>
        <div className="tab-pane container" id="menu3">
          <CourseAssesment
            authCtx={props.authCtx}
            ongoingCourse={props.ongoingCourse}
            showQuiz={props.showQuiz}
            latestSectionTopic={props.latestSectionTopic}
            currentSectionTopic={props.currentSectionTopic}
            sectionTopics={props.sectionTopics}
            setLatestSectionTopic={(data) => {
              props.setLatestSectionTopic(data);
            }}
            setCurrentSectionTopic={props.setCurrentSectionTopic}
            setTopic={props.setTopic}
            setCurrentTime={props.setCurrentTime}
            courseCompleted={props.courseCompleted}
          />
        </div>
        <div className="tab-pane container" id="menu4">
          <CourseMaterial topic={props.topic} />
        </div>
      </div>
    </>
  );
};

export default NavigationTabs;

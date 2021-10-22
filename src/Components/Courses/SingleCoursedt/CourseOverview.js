import React from "react";
const CourseOverview = (props) => {
  return (
    <>
      <div className="course_overview">
        <p className="title">Overview</p>
        <p className="para">Course Description</p>
        <p className="description_1" style={{ textTransform: "capitalize" }}>
          {props.course.description}
        </p>
      </div>
      {/* <!------------------- What you'll learn -----------------> */}
      <div className="check_list">
        <p>What you'll learn</p>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <ul className="list_left">
              {props.course.whatYouWillLearn.map((wh, i) => {
                return (
                  <li key={i} style={{ textTransform: "capitalize" }}>
                    <i className="fas fa-check"></i>
                    {wh}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* <div className="col-lg-6 col-md-6 col-sm-6">
            <ul className="list_right">
              <li>
                <i className="fas fa-check"></i>Become a UX designer.
              </li>
              <li>
                <i className="fas fa-check"></i>You will be able to add UX
                designer to your CV
              </li>
              <li>
                <i className="fas fa-check"></i>Become a UI designer.
              </li>
              <li>
                <i className="fas fa-check"></i>Build & test a full website
                design.
              </li>
              <li>
                <i className="fas fa-check"></i>Build & test a full mobile app.
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      {/* <!----------------Requirements-------------------------> */}
      <div className="course_requirements">
        <p>Requirements</p>
        <ul className="req_list">
          {props.course.requirements.map((req, i) => {
            return (
              <li key={i} style={{ textTransform: "capitalize" }}>
                <i className="fas fa-circle"></i>
                {req}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default CourseOverview;

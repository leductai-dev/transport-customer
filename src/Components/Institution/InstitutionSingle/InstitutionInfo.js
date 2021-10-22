import React from "react";

const InstitutionInfo = (props) => {
  return (
    <section className="info">
      <div className="container-fluid p20">
        <h1>Institution Details</h1>
        <div className="row m-0">
          <div className="col-sm-12 col-md-10 col-lg-8 col-xl-9 bb">
            {/* <h3 className="incharge">Owner info</h3> */}
            {/* <p>{props.institute.ownerInfo}</p> */}
            {/* <h3>Address</h3>
            <p className="address">
              329 Queensberry Street, North Melbourne <br /> VIC 3051,
              Australia.
              <br /> 123 456 7890
              <br /> support@smartedu.com
            </p> */}
            <h3>About Us</h3>
            <p>
              <span>&emsp;</span>
              {props.institute.aboutUs}
            </p>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-4 col-xl-3 bb">
            <h3 className="style2">Courses Handled</h3>
            <ul className="list">
              {props.institute.coursesHandled.map((cat, i) => (
                <li className="list-item" key={i}>
                  <i className="fas fa-check"></i>
                  {cat}
                </li>
              ))}
            </ul>
            <h3 className="style2">No of Courses</h3>
            <p className="style2">{props.institute.noOfCourses}</p>
            <h3 className="style2">No of Faculties</h3>
            <p className="style2">{props.institute.noOfFaculties}</p>
            <h3 className="style2">No of Students Enrolled</h3>
            <p className="style2">{props.institute.noOfStudents}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionInfo;

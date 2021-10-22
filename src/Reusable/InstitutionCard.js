import React, { useContext } from "react";
import InstitutionContext from "../Context/institution-context";
import RatingStar from "../UI/Ratings/RatingStar";
// import { Link } from "react-router-dom";
const InstitutionCard = (props) => {
  const ctx = useContext(InstitutionContext);

  const instituteUpdate = (institute) => {
    // console.log(institute);
    ctx.setInstitute(institute);
    props.history.push(`${props.match.url}/institution/${institute.id}`);
  };

  return (
    <>
      <div className="item col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <div className="card">
          <img
            className="card-img"
            src={`https://secure--storage.s3.ap-south-1.amazonaws.com/${props.institution.logoUrl}`}
            alt={props.institution.instituteName}
            // src={props.institution.Logourl}
            // alt={props.institution.InstituteName}
          />
          <div
            onClick={() => instituteUpdate(props.institution)}
            className="stretched-link"
          ></div>
          <div className="card-body text-center">
            <h3 className="card-title">{props.institution.instituteName}</h3>
            <p className="card-text">
              <RatingStar rating={props.institution.ratings} />
              {/* <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span> */}
            </p>
            {/* <p className="inst_place">{props.institution.address.district}</p> */}
            <hr />
            <p className="card_footer">
              <a className="sdt" href="#a">
                {props.institution.noOfStudents} Students
              </a>
              <a className="cor" href="#s">
                {props.institution.noOfCourses} Courses
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default InstitutionCard;

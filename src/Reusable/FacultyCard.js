import React, { useEffect } from "react";
const FacultyCard = (props) => {
  useEffect(() => {
    console.log("=========", props.faculty);
  }, []);

  let ui = null;
  if (props.faculty !== null && props.faculty !== undefined) {
    ui = (
      <>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <div className="card">
            <img
              className="card-img"
              src={`https://secure--storage.s3.ap-south-1.amazonaws.com/${
                props.faculty !== null && props.faculty.profileImage
              }`}
              alt={props.faculty.name}
            />

            <div className="card-body text-center">
              <h3 className="card-title">{props.faculty.name}</h3>
              <p className="card-text">
                Qualification {props.faculty.qualification}
              </p>
              <p className="card-text">Experie {props.faculty.qualification}</p>
              <hr />
              <p className="card_footer">
                Description {props.faculty.description}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return ui;
};

export default FacultyCard;

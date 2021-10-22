import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import InstitutionInfo from "./InstitutionInfo";
import FacultyCarouselView from "../../../Reusable/FacultyCarouselView";
import InstitutionContext from "../../../Context/institution-context";
import { getInstitute } from "../InstitutionDB";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

let instituteId = "";
const SingleInstitutionDetails = () => {
  const params = useParams();
  const ctx = useContext(InstitutionContext);
  const [institute, setInstitute] = useState(null);
  console.log("instituteCrx", ctx.institute);

  useEffect(() => {
    instituteId = params.institutionId;
    if (ctx.institute !== null) {
      setInstitute(ctx.institute);
    } else {
      getInstitute(instituteId, (res) => setInstitute(res));
    }
  }, []);

  let ui = null;
  if (institute !== null) {
    ui = (
      <>
        <section
          className="navbar_sect"
          style={{
            backgroundImage: `url(https://secure--storage.s3.ap-south-1.amazonaws.com/${ctx.institute.logoUrl})`
          }}
        >
          <div className="institution-single">
            <div className="container-fluid">
              <div className="inner_container">
                <h1 id="iname">{institute.instituteName}</h1>
                <p>
                  <Link to="/dashboard/home">Home</Link>&ensp;/&ensp;Institution
                  Profile
                </p>
              </div>
            </div>
          </div>
        </section>
        <InstitutionInfo ctx={ctx} institute={institute} />

        <section className="rltd_crs">
          <FacultyCarouselView ctx={ctx} institute={institute} />
        </section>
      </>
    );
  }
  return ui;
};

export default SingleInstitutionDetails;

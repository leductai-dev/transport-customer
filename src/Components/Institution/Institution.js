import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstitutionCard from "../../Reusable/InstitutionCard";
import { getInstitutions } from "./InstitutionDB";
import InstitutionFilter from "./InstitutionFilter";
import CarouselView from "../../Reusable/CarouselView";
import Toast from "../../UI/Toast/Toast";
// import $ from "jquery";
// import AWS from "../../Services/AWS";
import Spinner from "../../UI/Spinner/Spinner";
const Institution = (props) => {
  const [institutions, setInstitutions] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  useEffect(() => {
    getInstitutions((institutionList, fromCache) => {
      // console.log("institute", institutionList);
      setInstitutions(institutionList);
      if (fromCache) {
        setFromCache(true);
      }
    });
  }, []);

  let institutionsLists = null;
  if (institutions === null) {
    // console.log("null");
    institutionsLists = <Spinner />;
  } else {
    // console.log("else");
    institutionsLists = institutions.map((institution, i) => (
      <InstitutionCard institution={institution} key={i} {...props} />
    ));
  }

  return (
    <>
      {fromCache && (
        <Toast
          error="Internet Down!"
          fromCache={fromCache}
          duration={7000}
          msg="Please check your internet connection!!!"
        />
      )}
      <>
        <section
          className="navbar_sect"
          style={{ backgroundImage: `url(/images/bg5.jpg)` }}
        >
          <div className="inst_sect">
            <div className="container-fluid">
              <div className="inner_container">
                <h1>INSTITUTION</h1>
                <p>
                  <Link to="/home">Home</Link>&ensp;/&ensp;Institutions
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>{/* <CarouselView /> */}</section>

        <section className="sect3">
          <div className="container-fluid">
            <div className="inst-view">
              <p className="row_head">
                <span className="noi">
                  {institutions !== null && institutions.length}&ensp;
                  <i>Institutions</i>
                </span>
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="Search for Institutes"
                  style={{ width: "30%" }}
                />
                <button
                  className="form-control-feedback"
                  type="submit"
                  value="search"
                >
                  <i className="fa fa-search"></i>
                </button> */}
              </p>
              <div className="row m-0">{institutionsLists}</div>
            </div>
          </div>
        </section>
      </>
    </>
  );
};
export default Institution;

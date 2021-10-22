import React from "react";
import {Link} from "react-router-dom"
import InstitutionFilter from "./InstitutionFilter";
import CarouselView from "../../Reusable/CarouselView";

const InstitutionList = (props) => {
  return (
    <>
      <section
        className="navbar_sect"
        style={{ backgroundImage: "url(/images/bg5.jpg)" }}
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

      <section>
        <CarouselView />
      </section>

      <section className="sect3">
        <div className="container-fluid">
          <div className="row" style={{ margin: "0" }}>
            <InstitutionFilter />
            <div className="col-md-8 col-lg-9 col-xl-9">
              <p className="row_head">
                <span className="noi">
                  85&ensp;<i>Institutions</i>
                </span>
                <input
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
                </button>
              </p>
              <div className="row m-0">{props.institutionsLists}</div>
              <div className="mbp_pagination">
                <ul className="page_navigation">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="courses.html"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      <span>
                        <i className="fas fa-arrow-left"></i>
                      </span>
                      &ensp;Prev
                    </a>{" "}
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="courses.html">
                      1
                    </a>
                  </li>
                  <li className="page-item" aria-current="page">
                    <a className="page-link" href="courses.html">
                      2 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="courses.html">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="courses.html">
                      14
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="courses.html">
                      <span>
                        Next&ensp;<i className="fas fa-arrow-right"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstitutionList;

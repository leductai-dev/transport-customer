import React from "react";
import { Link, useHistory } from "react-router-dom";

const Category = (props) => {
  const history = useHistory();
  const moveToCategory = (cate) => {
    console.log("cate", cate);
    history.push(`/dashboard/courses?categoryName=${cate.categoryName}`);
  };

  return (
    <section className="crs_sect" id="ourcourse">
      <div className="container-fluid">
        <h3>Our service</h3>
        <p className="crs_title">
          Our Shipping Solutions help your business maintain high and reliable service levels and achieve full tracking of product shipments. At the same time, we help cut shipping costs. Our team ideally combines systems, carriers and resources to meet your specific needs.
        </p>
        <div className="row">
          {props.category.map((cate, i) => {
            return (
              <div
                className="col-sm-6 col-md-6 col-lg-3"
                key={i}
                onClick={() => moveToCategory(cate)}
              >
                <img
                  className="crs_img"
                  src={`/images/t${i + 1}.jpg`}
                  alt={cate.categoryName}
                />
                <div className="img_overlay"></div>
                <div className="crs_caption">
                  <p>
                    <b>Service</b>
                  </p>
                  <p>Shipping service to 63 provinces</p>
                </div>
              </div>
            );
          })}

          {/* <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t2.jpg" alt="IES" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>IES</b>
              </p>
              <p>Over 800+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t3.jpg" alt="GATE" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>GATE</b>
              </p>
              <p>Over 400+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t4.jpg" alt="CSIR" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>CSIR UGC NET</b>
              </p>
              <p>Over 150+ courses</p>
            </div>
          </div> */}
        </div>
        {/* <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t5.jpg" alt="IIT-JEE" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>IIT-JEE</b>
              </p>
              <p>Over 300+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t6.jpg" alt="NEET" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>NEET</b>
              </p>
              <p>Over 50+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t7.jpg" alt="LAW" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>LAW</b>
              </p>
              <p>Over 200+ courses</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <img className="crs_img" src="/images/t9.jpg" alt="RRB" />
            <div className="img_overlay"></div>
            <div className="crs_caption">
              <p>
                <b>RRB</b>
              </p>
              <p>Over 300+ courses</p>
            </div>
          </div>
        </div> */}
        {/* <form action="courses.html" method="get"> */}
        <Link className="crs_btn" to={`${props.match.url}/courses`}>
          See all
        </Link>
        {/* </form> */}
      </div>
    </section>
  );
};

export default Category;

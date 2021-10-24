import React from "react";
import { Link } from "react-router-dom";
import "../../styles.css";

const Footer = (props) => {
  return (
    <>
      <section className="footer_one">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-3 col-lg-3">
              <div className="footer_contact_widget">
                <h4>CONTACT</h4>
                <p>329 Queensberry Street, North Melbourne </p>
                <p>VIC 3051, Australia.</p>
                <p>123 456 7890</p>
                <p>support@smartedu.com</p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-md-3 col-lg-2">
              <div className="footer_company_widget">
                <h4>COMPANY</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Institution</a>
                  </li>
                  <li>
                    <a href="#">Become a Teacher</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-md-3 col-lg-2">
              <div className="footer_program_widget">
                <h4>COURSES</h4>
                <ul className="list-unstyled">
                  {props.category !== null &&
                    props.category !== undefined &&
                    props.category.map((cat) => {
                      return (
                        <li key={cat.categoryName}>
                          <Link
                            style={{ textTransform: "uppercase" }}
                            to={`/dashboard/courses?categoryName=${cat.categoryName}`}
                          >
                            {cat.categoryName}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-md-3 col-lg-2">
              <div className="footer_support_widget">
                <h4>SUPPORT</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Documentation</a>
                  </li>
                  <li>
                    <a href="#">Forums</a>
                  </li>
                  <li>
                    <a href="#">Language Packs</a>
                  </li>
                  <li>
                    <a href="#">Release Status</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-sm-6 col-md-6 col-md-3 col-lg-3">
              <div className="footer_apps_widget">
                <h4>MOBILE</h4>
                <div className="app_grid">
                  <button type="submit" className="btn btn_ios" value="">
                    <p className="btn_logo">
                      <i className="fab fa-apple"></i>
                    </p>
                    <p className="para">
                      App Store
                      <br />
                      <span>Available now on the</span>
                    </p>
                  </button>
                  <button type="submit" className="btn btn_android" value="">
                    <p className="btn_logo">
                      <i className="fab fa-google-play"></i>
                    </p>
                    <p className="para" style={{ marginRight: "43px" }}>
                      Google Play
                      <br />
                      <span>Get it on</span>
                    </p>
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="footer_middle_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 p15">
              <div className="logo-widget home1">
                <img
                  className="img-fluid"
                  src="../../others/Bodhi1.png"
                  alt="bodhi"
                />
              </div>
            </div>
            <div className="col-sm-8 col-md-5 col-lg-6 col-xl-6 p25 brdr_left_right">
              <div className="footer_menu_widget">
                <ul>
                  <li className="list-inline-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Privacy</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Terms</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Sitemap</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Purchase</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-3 col-xl-4 p15">
              <div className="footer_social_widget">
                <ul>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-dribbble"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer_bottom_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="copyright-widget text-center">
                <p>Copyright TSMS © 2021. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;

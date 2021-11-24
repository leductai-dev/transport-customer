import React from "react";
import { Link } from "react-router-dom";
import "../../styles.css";

const Footer = (props) => {
  return (
    <>
      <div id="call-me" className="d-flex " style={{ width: "50px", height: "50px", position: "fixed", backgroundColor: "#cbe54f", bottom: "20px", left: "30px", zIndex: "2", cursor: "pointer", justifyContent: "center", alignItems: "center" }} >
        <a href="tel:0847247099">
          <i class="fas fa-phone-alt text-white"></i></a>
      </div>
      <section className="footer_one">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-3 col-lg-3">
              <div className="footer_contact_widget">
                <h4>LIÊN LẠC</h4>
                <p>254 Nguyen Van Linh </p>
                <p>Da Nang , Viet Nam.</p>
                <p>0347247099</p>
                <p>letrunghieu5612@gmail.com</p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-md-3 col-lg-2">
              <div className="footer_company_widget">
                <h4>CÔNG TY</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Trang chủ</a>
                  </li>
                  <li>
                    <a href="">Liên hệ</a>
                  </li>
                  <li>
                    <a href="#">Về chúng tôi</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-md-3 col-lg-2">
              <div className="footer_program_widget">
                <h4>DỊCH VỤ</h4>
                <ul className="list-unstyled">
                  <li>Thuê xe tải</li>
                  <li>Vận chuyển hàng</li>
                  <li>Chăm sóc xe</li>
                </ul>
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
                    <a href="#">Tài liệu</a>
                  </li>
                  <li>
                    <a href="#">Diễn đàn</a>
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
          <div className="d-flex flex-sm-row flex-column justify-content-between">
            <div className="p15">
              <div className="logo-widget home1">
                <div className="navbar_img"></div>

              </div>
            </div>

            <div className=" p15 mr-auto mr-sm-0">
              <div className="footer_social_widget">
                <ul className="p-0">
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

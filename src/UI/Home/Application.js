import React from "react";
const Application = () => {
  return (
    <>
      <section className="app_sect">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="app_links">
                <form action="#" method="get">
                  <h3>Download & Enjoy</h3>
                  <p>
                    Access your courses anywhere, anytime & prepare <br /> with
                    practice tests.
                  </p>
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
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="phn_image">
                <img
                  className="phn_img"
                  src="/images/phone_home.png"
                  alt="mobile"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Application;

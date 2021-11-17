import React from "react";
import AlgoliaSearch from "../../NewFeatureTest/AlgoliaSearch";
const CarouselImages = () => {
  return (
    <>
      <section className="home_sect">
        <div className="container-fluid p-0">
          <div id="demo" className="carousel slide" data-ride="carousel">
            {/* <!-- The slideshow --> */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="img-fluid"
                  src="/images/Banner-truck.jpg"
                  alt="Carousel_Image"
                />
                <div className="img_overlay"></div>
                <div className="carousel-caption">
                  <img
                    className="carousel-img"
                    src="/images/hicon1.png"
                    alt="Icon"
                  />
                  <h3>Hãy giao cho chúng tôi những đơn hàng khó </h3>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="img-fluid"
                  src="/images/Banner-truck2.jpg"
                  alt="Carousel_Image"
                />
                <div className="img_overlay"></div>
                <div className="carousel-caption">
                  <img
                    className="carousel-img"
                    src="/images/hicon2.png"
                    alt="Icon"
                  />
                  <h3>Ước tính chi phí</h3>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="img-fluid"
                  src="/images/Banner-truck3.jpg"
                  alt="Carousel_Image"
                />
                <div className="img_overlay"></div>
                <div className="carousel-caption">
                  <img
                    className="carousel-img"
                    src="/images/hicon4.png"
                    alt="Icon"
                  />
                  <h3>Tìm giải pháp tốt nhất</h3>
                </div>
              </div>
            </div>

            {/* <!-- Left and right controls --> */}
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
          <div className="over_content">
            <p>
              GIẢI PHÁP TỐI ƯU VẬN TẢI <span>PHÙ HỢP VỚI TÌNH HÌNH COVID-19
              </span>
            </p>
            {/* <AlgoliaSearch /> */}
            <p className="under_q">
              Công nghệ đang mang lại một phương thức vận chuyển hàng hóa ồ ạt một cách nhanh chóng và tiết kiệm.

            </p>
          </div>
          {/* <!-- Go to section --> */}
          <div className="scrollbtn">
            <a className="link" href="#ourcourse">
              <div className="outer">
                <div className="middle">
                  <div className="inner">
                    <span>
                      <i className="fas fa-long-arrow-alt-down"></i>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
          {/* <!-- ------------ --> */}
        </div>
      </section>
    </>
  );
};
export default CarouselImages;

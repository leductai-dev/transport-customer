import React from "react";

const MyCertificatesView = () => {
  return (
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <div class="card">
        <div class="thumb">
          <img
            class="card-img"
            src="/images/certificatesample.jpg"
            alt="Card image"
          />
          <div class="img_overlay">
            <div class="center">View Certificate</div>
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title">Oracle Certified Associate Java Programmer</h3>
          <p class="card-text">
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default MyCertificatesView;

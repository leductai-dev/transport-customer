import React, { useEffect, useState } from "react";
import FacultyCard from "./FacultyCard";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getFaculties } from "../Components/Institution/InstitutionDB";
// import { db } from "../Services/firebase";
const CarouselView = (props) => {
  const [faculties, setFaculties] = useState(null);
  // if ($.isFunction("owlCarousel")) {
  useEffect(() => {
    // console.log("cccccccc", props.ctx);
    if (props.ctx !== null) {
      getFaculties(props.ctx, (results) => {
        setFaculties(results);
        console.log(".......>>>", results);
      });
    }
  }, []);

  const options = {
    loop: false,
    stagePadding: 15,
    margin: 10,
    nav: true,
    navText: [
      '<span className="uk-margin-small-right uk-icon"><i class="fas fa-chevron-left"></i></span>',
      '<span className="uk-margin-small-left uk-icon"><i class="fas fa-chevron-right"></i></span>'
    ],
    responsive: {
      0: {
        items: 1
      },
      640: {
        items: 2
      },
      960: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };
  // }

  let ui = null;
  if (faculties !== null) {
    ui = faculties.map((faculty) => {
      return (
        <FacultyCard className="item" faculty={faculty} key={faculty.id} />
      );
    });
  }

  return (
    <>
      <div className="container-fluid sect2">
        <h3 className="heading">
          <b>Faculties</b>
        </h3>
        <div className="uk-section">
          <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {ui}
          </OwlCarousel>
        </div>
      </div>
    </>
  );
};

export default CarouselView;

import React, { useState, useEffect } from "react";
import CarouselImages from "../../UI/Home/CarouselImages";
import Category from "../../UI/Home/Category";
import Registration from "../../UI/Home/Registration";
import TopCourses from "../../UI/Home/TopCourses";
// import Application from "../../UI/Home/Application";
import Testimonal from "../../UI/Home/Testimonal";
// import { db } from "../../Services/firebase";

const Home = (props) => {
  // const [topCourse, setTopCourse] = useState(null);
  // const [category, setCategory] = useState(null);

  let ui = null;
  if (props.category !== null) {
    ui = <TopCourses category={props.category} />;
  }
  return (
    <>
      <CarouselImages />
      {props.category !== null && (
        <Category category={props.category} {...props} />
      )}
      <Registration authCtx={props.authCtx} />
      {ui}
      {/* <Application /> */}
      <Testimonal />
    </>
  );
};
export default Home;

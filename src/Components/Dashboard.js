import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { Route, Switch } from "react-router-dom";

import Home from "./Home/Home";
import Courses from "./Courses/Courses";
import Institution from "./Institution/Institution";
import Exams from "./Exams/Exams";
import Aboutus from "./Aboutus/Aboutus";
import Contactus from "./Contact/Contactus";
import Footer from "./Footer/Footer";
import Scroller from "../UI/Scroller";
// import SingleCourseDetails from "./Courses/SingleCoursedt/SingleCourseDetails";
import SingleInstitutionDetails from "./Institution/InstitutionSingle/SingleInstitutionDetails";
import { CoursesContextProvider } from "../Context/courses-context";
import { InstitutionContextProvider } from "../Context/institution-context";
import CourseDetails from "./Courses/SingleCoursedt/CourseDetails";
// import $ from "jquery";

import IdleTimeoutModal from "../UI/IdleTimeOutModal";
import IdleTimerContainer from "../Helpers/IdleTimerContainer";
import { auth, db } from "../Services/firebase";
import AuthContext from "../Context/auth-context";

import * as bookLoader from "../assets/lotties/28893-book-loading.json";
// import * as bookLoader from "../../public/lotties/28893-book-loading.json";
import Lottie from "react-lottie";

const Dashboard = (props) => {
  // console.log("dashboard", props.history);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [isTimedout, setIsTimedout] = useState(false);
  const authCtx = useContext(AuthContext);
  const [category, setCategory] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    console.log("dashbaord", props.history.location.pathname);
    if (props.history.location.pathname === "/dashboard") {
      props.history.push("/dashboard/home");
    }
    db.collection("category")
      .doc("categories")
      .get()
      .then((doc) => {
        setCategory(doc.data().catDetails);
        sessionStorage.setItem(
          "categories",
          JSON.stringify(doc.data().catDetails)
        );
      });
    setTimeout(() => {
      setloading(true);
    }, 2000);
  }, []);

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: bookLoader.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleClose = () => {
    setShowTimeoutModal(false);
    setIsTimedout(false);
  };

  const timeoutModalHandler = () => {
    setShowTimeoutModal(true);
  };

  const logoutHandler = () => {
    setShowTimeoutModal(false);
    authCtx.setUser(null);
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    localStorage.removeItem("latestSectionTopic");
    sessionStorage.removeItem("updatedQues");
    // sessionStorage.removeItem("updatedQues");
    db.collection("students")
      .doc(authCtx.user.id)
      .update({
        isLoggedIn: false
      })
      .then(() => {
        auth
          .signOut()
          .then(() => {
            // Sign-out successful.
            console.log("signed out successfully...");
            // alert("signed out");
            props.history.replace("/login");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {/* {console.log(localStorage.getItem("userId"))} */}
      {sessionStorage.getItem("userId") !== null && (
        <>
          <IdleTimeoutModal
            showModal={showTimeoutModal}
            handleClose={handleClose}
            handleLogout={logoutHandler}
          />
          <IdleTimerContainer
            handleLogout={logoutHandler}
            timeout={isTimedout}
            timeoutModal={timeoutModalHandler}
            timedoutHandler={(bool) => {
              setIsTimedout(bool);
            }}
          />
        </>
      )}
      {!loading ? (
        <div
          style={{
            margin: "auto",
            width: "fit-content",
            height: "fit-content",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <Lottie options={defaultOptions1} height={300} width={300} />
        </div>
      ) : (
        <>
          <Navbar category={category} {...props} />
          <InstitutionContextProvider>
            <CoursesContextProvider>
              <Switch>
                <Route path={`/dashboard/home`}>
                  <Home authCtx={authCtx} category={category} {...props} />
                </Route>
                <Route path={`/dashboard/courses/:courseId`}>
                  {/* <SingleCourseDetails /> */}
                  <CourseDetails />
                </Route>
                <Route path={`/dashboard/courses`}>
                  <Courses {...props} />
                </Route>
                <Route path={`/dashboard/institution/:institutionId`}>
                  <SingleInstitutionDetails />
                </Route>
                <Route path={`/dashboard/institution`}>
                  <Institution {...props} />
                </Route>
                <Route path={`/dashboard/exams`}>
                  <Exams {...props} />
                </Route>
                <Route path={`/dashboard/aboutus`}>
                  <Aboutus {...props} />
                </Route>
                <Route path={`/dashboard/contactus`}>
                  <Contactus {...props} />
                </Route>
              </Switch>
            </CoursesContextProvider>
          </InstitutionContextProvider>
          <Footer categor={category} />
          <Scroller />
        </>
      )}
    </>
  );
};

export default Dashboard;

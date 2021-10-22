import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import MyProfile from "./MyProfile/MyProfile";
import MyCourses from "./MyCourses/MyCourses";
import MyBookmarks from "./MyBookmarks/MyBookmarks";
import MyCart from "./MyCart/MyCart";
import MyOrder from "./MyOrder/MyOrder";
import MySettings from "./MySettings/MySettings";
import UserFooter from "./UserFooter/UserFooter";
import { Route, Switch } from "react-router-dom";
import MyCertificate from "./MyCertificates/MyCertificate";
import Navbar from "../Navbar/Navbar";
import AuthContext from "../../Context/auth-context";
// import { auth } from "../../Services/firebase";
import { CoursesContextProvider } from "../../Context/courses-context";

const UserDashboard = (props) => {
  const authCtx = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    console.log("userDashboard-authCtx_user", authCtx.user, props.history);
    if (authCtx.user !== null) {
      setBookmarks(authCtx.user.bookmarks);
    }
  }, [authCtx.user, props.history]);

  let userDashboard = null;
  if (bookmarks === null) {
    userDashboard = <p>Loading!!!</p>;
  } else if (bookmarks !== null) {
    userDashboard = <MyBookmarks bookmarks={bookmarks} {...props} />;
  }

  return (
    <>
      <Navbar
        category={JSON.parse(sessionStorage.getItem("categories"))}
        {...props}
      />
      <div className="nav-backdrop"></div>
      <section style={{ backgroundColor: "#f9fafc" }}>
        <CoursesContextProvider>
          <div className="container-fluid mt60">
            <div className="row m-0">
              <Sidebar authCtx={authCtx} {...props} />
              <div className="col-md-9 col-lg-10 col-xl-10 scrollbar">
                <Header authCtx={authCtx} />
                <Switch>
                  <Route path={`${props.match.url}/myProfile`}>
                    <MyProfile {...props} authCtx={authCtx} />
                  </Route>
                  <Route path={`${props.match.url}/mycourses`}>
                    <MyCourses authCtx={authCtx} />
                  </Route>
                  <Route path={`${props.match.url}/mybookmarks`}>
                    {userDashboard}
                  </Route>
                  <Route path={`${props.match.url}/mycart`}>
                    <MyCart {...props} />
                  </Route>
                  <Route path={`${props.match.url}/myorder`}>
                    <MyOrder {...props} authCtx={authCtx} />
                  </Route>
                  <Route path={`${props.match.url}/mysettings`}>
                    <MySettings {...props} authCtx={authCtx} />
                  </Route>
                  <Route path={`${props.match.url}/myCertificates`}>
                    <MyCertificate {...props} />
                  </Route>
                </Switch>
                <UserFooter />
              </div>
            </div>
          </div>
        </CoursesContextProvider>
      </section>
    </>
  );
};

export default UserDashboard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Overlay = () => {
  return (
    <div class="dash-overlay">
      <ul class="nav-list">
        <li>
          <Link action="push" class="list-link" to={`/userdashboard/myprofile`}>
            <i class="far fa-user"></i>My Profile
          </Link>
        </li>
        <li>
          <Link action="push" class="list-link" to={`/userdashboard/mycourses`}>
            <i class="fas fa-tv"></i>My Courses
          </Link>
        </li>
        <li>
          <Link
            action="push"
            class="list-link"
            to={`/userdashboard/mybookmarks`}
          >
            <i class="far fa-heart"></i>My Bookmarks
          </Link>
        </li>
        <li>
          <Link action="push" class="list-link" to={`/userdashboard/myorder`}>
            <i class="fas fa-receipt"></i>My Orders
          </Link>
        </li>
        <li>
          <Link
            action="push"
            class="list-link"
            to={`/userdashboard/mysettings`}
          >
            <i class="fas fa-user-cog"></i>My Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Header = (props) => {
  const [isOverlay, setIsOverlay] = useState(false);

  const overlayHandler = () => {
    console.log("overlay");
    setIsOverlay((prevState) => {
      console.log("prev", prevState);
      console.log("prev-opp", !prevState);
      return !prevState;
    });
  };

  return (
    <div class="dashboard">
      <p class="title m-0">{props.authCtx.user.name}</p>
      <p class="link m-0">
        <Link to="/home">Home</Link>
        &ensp;/&ensp;Dashboard
      </p>
      <p class="button" onClick={overlayHandler}>
        <i class="fas fa-bars"></i>
      </p>
      {isOverlay === true ? (
        <Overlay logout={props.logout} userDetail={props.userDetail} />
      ) : null}
    </div>
  );
};

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  const logoutHandler = () => {
    if (props.authCtx !== null) {
      props.authCtx.logout();
    }
  };

  return (
    <div class="sidebar col-md-3 col-lg-2 col-xl-2 p-0">
      <div class="content">
        <h3>Dashboard</h3>
        <ul class="prfl_list p-0">
          <li>
            <NavLink
              activeClassName={classes.activeLink}
              class="list-link"
              to={`${props.match.url}/myprofile`}
            >
              <i class="far fa-user"></i>My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.activeLink}
              class="list-link"
              to={`${props.match.url}/mycourses`}
            >
              <i class="fas fa-tv"></i>My Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.activeLink}
              class="list-link"
              to={`${props.match.url}/mybookmarks`}
            >
              <i class="far fa-heart"></i>My Bookmarks
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              activeClassName={classes.activeLink}
              class="list-link"
              to={`${props.match.url}/mycart`}
            >
              <i class="fas fa-shopping-cart"></i>My Cart
            </NavLink>
          </li> */}
          <li>
            <NavLink
              activeClassName={classes.activeLink}
              class="list-link"
              to={`${props.match.url}/myorder`}
            >
              <i class="fas fa-receipt"></i>My Orders
            </NavLink>
          </li>
        </ul>
        <h3>Account</h3>
        <ul class="prfl_list p-0">
          <li class="list-item">
            <NavLink
              activeClassName={classes.activeLink}
              class="list-link"
              to={`${props.match.url}/mysettings`}
            >
              <i class="fas fa-user-cog"></i>Settings
            </NavLink>
          </li>
          <li class="list-item">
            <button class="list-link" onClick={logoutHandler}>
              <i class="fas fa-sign-out-alt"></i>Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import AuthContext from "../../Context/auth-context";
import "./Navbar.css";
const Overlay = (props) => {
    const logoutHandler = () => {
        props.authCtx.logout();
        // localStorage.removeItem("userId");
    };

    return (
        <div className="overlay">
            <div className="header">
                <img
                    className="img-fluid"
                    src={
                        props.user === null
                            ? "/images/4.jpg"
                            : props.user.photoUrl
                    }
                    alt="userprofile"
                />
                <p>
                    <span className="usern" id="username">
                        {props.user.name}
                    </span>
                    <br />
                    <small id="usermail">{props.user.email}</small>
                </p>
            </div>
            <ul className="list">
                <li className="list-item">
                    <Link className="list-link" to="/userDashboard/myProfile">
                        My Profile
                    </Link>
                    <i className="far fa-id-badge"></i>
                </li>
                <li className="list-item">
                    <Link className="list-link" to="/userDashboard/mycourses">
                        My Courses
                    </Link>
                    <i className="fas fa-tv"></i>
                </li>
                <li className="list-item">
                    <Link className="list-link" to="/userDashboard/myorder">
                        Purchase History
                    </Link>
                    <i className="fas fa-history"></i>
                </li>
                {/* <li className="list-item">
          <Link className="list-link" to="/userDashboard/myProfile">
            Help
          </Link>
          <i className="far fa-question-circle"></i>
        </li> */}
                <li className="list-item">
                    <button
                        type="button"
                        className="list-link"
                        style={{ background: "transparent" }}
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                    <i className="fas fa-sign-out-alt"></i>
                </li>
            </ul>
        </div>
    );
};

const Navbar = (props) => {
    // console.log("navcate", props.category);
    if (window.matchMedia("(min-width: 768px)").matches) {
        $(document).ready(function () {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 50) {
                    $(".fixed-top").css({
                        "background-color": "rgb(255 255 255 / 51%)",
                        "backdrop-filter": "blur(10px)",
                    });
                    $("#navigation").css(
                        "box-shadow",
                        "0px 0px 30px rgb(0 0 0 / 10%)"
                    );
                    // $(".navbar_img").css(
                    //   "background-image",
                    //   "url(../../others/Bodhi1.png)"
                    // );
                    $(".navbar-brand").css(
                        "border-right",
                        "1px solid rgba(0, 0, 0, 0.2)"
                    );
                    $(".nav-link").css("color", "#000");
                    $("#usericon").css("color", "#000");
                } else {
                    $(".fixed-top").css("background-color", "");
                    $("#navigation").css("box-shadow", "");
                    $(".navbar_img").css("background-image", "");
                    $(".navbar-brand").css("border-right", "");
                    $(".nav-link").css("color", "");
                    $("#usericon").css("color", "");
                }
                if ($(window).scrollTop() > 100) {
                    $(".nav-link").hover(
                        function () {
                            $(this).css("color", "#2441e7");
                        },
                        function () {
                            $(this).css("color", "#000");
                        }
                    );
                } else {
                    $(".nav-link").hover(
                        function () {
                            $(this).css("color", "");
                        },
                        function () {
                            $(this).css("color", "");
                        }
                    );
                }
            });

            // Mobile Device
            // $("nav.navbar div.collapse ul.navbar-nav li.dropdown").hover(
            //   function () {
            //     $(this).find(".dropdown-menu").slideToggle(300);
            //   },
            //   function () {
            //     $(this).find(".dropdown-menu").slideToggle(100);
            //   }
            // );
        });
    }
    // const history = useHistory();
    const authCtx = useContext(AuthContext);
    const [user, setUser] = useState("");
    const [isOverlay, setIsOverlay] = useState(false);

    useEffect(() => {
        // console.log("navbar", authCtx.isLoggedIn, authCtx.user);
        setUser(authCtx.user);
        authCtx.setHistory(props.history);
        // to set the history and to be used in authContext logout
    }, [authCtx]);

    const overlayHandler = () => {
        // console.log("overlay");
        setIsOverlay((prevState) => {
            // console.log("prev", prevState);
            // console.log("prev-opp", !prevState);
            return !prevState;
        });
    };
    const categories = [
        {
            categoryName: "Thuê xe tải",
            link: "thue-xe-tai",
            subcategoryList: [
                { categoryName: "Thuê xe tải", link: "thue-xe-tai" },
            ],
        },
        {
            categoryName: "Vận chuyển hàng",
            subcategoryList: [
                {
                    categoryName: "Vận chuyển đường bộ",
                    link: "/dashboard/order",
                },
                {
                    categoryName: "Vận chuyển đường thủy",
                    link: "/dashboard/order",
                },
                {
                    categoryName: "Vận chuyển nước ngoài",
                    link: "/dashboard/order",
                },
            ],
        },
        {
            categoryName: "Chăm sóc xe",
            link: "/dashboard/order",
            subcategoryList: [
                { categoryName: "Thuê xe tải", link: "/dashboard/order" },
            ],
        },
    ];
     const courseUi = categories.map((cat, i) => {
            return (
                <li>
                    <Link className="dropdown-item" to={cat.link}>
                        {cat.categoryName}
                        <i className="fas fa-chevron-right"></i>
                    </Link>
                    <ul style={{
                      width: '300px',
                      height: 'auto'
                    }} className="sub-menu">
                        {cat.subcategoryList.map((subcat) => {
                            return (
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to={subcat.link}
                                    >
                                        {subcat.categoryName}
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            <Link
                                className="dropdown-item"
                                to={`/dashboard/courses`}
                            >
                                Detail
                            </Link>
                        </li>
                    </ul>
                </li>
            );
        });

    return (
        <>
            <nav
                className="navbar navbar-expand-md navbar-dark fixed-top"
                id="navigation"
            >
                <Link
                    action="push"
                    className="navbar-brand"
                    to={`/dashboard/home`}
                >
                    <div className="navbar_img"></div>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="collapsibleNavbar"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                action="push"
                                className="nav-link"
                                to={`/dashboard/home`}
                                style={{ paddingLeft: "0px" }}
                            >
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#courses"
                                id="navbardrop"
                                data-toggle="dropdown"
                            >
                                Dịch vụ
                            </a>
                            <ul className="dropdown-menu">
                                {courseUi}
                                <li></li>
                            </ul>
                        </li>

                        {/* <!-- Dropdown --> */}

                        <li className="nav-item">
                            {/* <div
                className="nav-link"
                onClick={() => pushHandler("/dashboard/aboutus")}
                style={{ paddingLeft: "0px" }}
              >
                Aboutus
              </div> */}
                            <Link
                                action="push"
                                className="nav-link"
                                to={`/dashboard/aboutus`}
                            >
                                Về chúng tôi
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* <div
                className="nav-link"
                onClick={() => pushHandler("/dashboard/contactus")}
                style={{ paddingLeft: "0px" }}
              >
                Contact
              </div> */}
                            <Link
                                action="push"
                                className="nav-link"
                                to={`/dashboard/contactus`}
                            >
                                Liên hệ
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* <div
                className="nav-link"
                onClick={() => pushHandler("/dashboard/contactus")}
                style={{ paddingLeft: "0px" }}
              >
                Contact
              </div> */}
                            <Link
                                action="push"
                                className="nav-link"
                                to={`/dashboard/myorders`}
                            >
                              Đơn của tôi
                            </Link>
                        </li>
                        {authCtx.isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="nav-link"
                                        style={{
                                            background: "transparent",
                                            border: "none",
                                        }}
                                        onClick={authCtx.logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="View Cart !"
                                        to="/userDashboard/mybookmarks"
                                    >
                                        <i class="fas fa-heart"></i>
                                    </Link>
                                </li>
                                <li className="prfl_img">
                                    <Link
                                        action="push"
                                        className="nav-link"
                                        to={`/userDashboard/myProfile`}
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={overlayHandler}
                                        // onClick={() => {
                                        //   // take it after, just for testing
                                        //   props.history.push("/userDashboard/myProfile");
                                        //   console.log("overlay");
                                        //   setIsOverlay((prevState) => !prevState);
                                        // }}
                                    >
                                        <img
                                            className="img-fluid"
                                            src={
                                                user === null
                                                    ? "/images/4.jpg"
                                                    : user.photoUrl
                                            }
                                            alt="userprofile"
                                        />
                                    </button>
                                    {isOverlay === true ? (
                                        <Overlay
                                            logout={props.logout}
                                            userDetail={props.userDetail}
                                            authCtx={authCtx}
                                            user={user}
                                        />
                                    ) : null}
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <i className="far fa-user" id="usericon"></i>
                                <Link
                                    action="push"
                                    className="nav-link"
                                    to={`/login`}
                                >
                                    Login&nbsp;/&nbsp;Logout
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { auth, db } from "../../Services/firebase";
import "./Signin.css";
import classes from "./Signin.module.css";
import $ from "jquery";
import AuthContext from "../../Context/auth-context";
import ForgotPassModal from "../../UI/ForgotPassword/ForgotPassModal";
import { Link } from "react-router-dom";

const Signin = (props) => {
  // useEffect(() => {
  //   console.log("asda", props.history);
  // }, []);
  $(document).ready(function () {
    const sliderContainer = document.querySelector(".slider-container");
    const slideRight = document.querySelector(".right-slide");
    const slideLeft = document.querySelector(".left-slide");
    // const slidesLength = $(".right-slide").children();
    // const upButton = document.querySelector(".up-button");
    // const downButton = document.querySelector(".down-button");
    // const slidesLength = slideRight.querySelectorAll(".container-fluid").length;

    let activeSlideIndex = 0;

    // slideLeft.style.top = `-${(2 - 1) * 100}vh`;

    $(".left-slide").css("top", "-100vh");

    $(".up-button").click(function () {
      changeSlide("up");
    });

    $(".down-button").click(function () {
      changeSlide("down");
    });

    // upButton.addEventListener("click", () => changeSlide("up"));
    // downButton.addEventListener("click", () => changeSlide("down"));

    const changeSlide = (direction) => {
      const sliderHeight = sliderContainer.clientHeight;
      if (direction === "up") {
        activeSlideIndex++;
        if (activeSlideIndex > 2 - 1) {
          activeSlideIndex = 0;
        }
      } else if (direction === "down") {
        activeSlideIndex--;
        if (activeSlideIndex < 0) {
          activeSlideIndex = 2 - 1;
        }
      }

      slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight
        }px)`;
      slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight
        }px)`;
    };
  });

  const [error, setError] = useState(null);
  const [userCred, setUserCred] = useState({
    email: "",
    password: ""
  });
  const [forgotModal, setForgotModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const authCtx = useContext(AuthContext);
  // let userId = null;

  const changeHandler = (event) => {
    let val = event.target.value;
    setUserCred((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // firebase signin auth
    auth
      .signInWithEmailAndPassword(
        userCred.email.trim(),
        userCred.password.trim()
      )
      .then((userCredential) => {
        // Signed in
        let userId = userCredential.user.uid;
        setUserId(userId);
        let photoUrl = "";
        console.log("userId", userId);

        // get the particular user, using the
        db.collection("students")
          .doc(userId)
          .get()
          .then((doc) => {
            let user = doc.data();
            console.log("signin", user);
            photoUrl = user.photoUrl;
            if (user.isLoggedIn) {
              // if already one person is logged in
              setError(
                "Already logged in, logout from other device to login again..."
              );
            } else {
              let data = {
                isLoggedIn: true
              };
              // if password is reset, then that password should be update in firestore
              if (user.password !== userCred.password.trim()) {
                data = {
                  isLoggedIn: true,
                  password: userCred.password.trim()
                };
              }
              db.collection("students")
                .doc(userId)
                .update(data)
                .then(() => {
                  // may use it later for refresh or some edge cases
                  localStorage.setItem("userId", userId);
                  // to identify, whether reloading or closing the tab
                  sessionStorage.setItem("userId", userId);
                  authCtx.setIsLoggedIn(true);
                  // props.history.replace(`/home?userId=${userId}`);
                  props.history.replace("/dashboard/home"); // redirect it to home
                  let ongoingCourses = [];
                  let bookmarks = [];
                  let preferences = [];
                  let orders = [];
                  let completedCourses = [];

                  db.collection("students")
                    .doc(userId)
                    .collection("userCourseDetails")
                    .doc("courseDetails")
                    .get()
                    .then((doc) => {
                      let courseDetails = doc.data();
                      ongoingCourses = courseDetails.ongoingCourses;
                      bookmarks = courseDetails.bookmarks;
                      preferences = courseDetails.preferences;
                      orders = courseDetails.orders;
                      completedCourses = courseDetails.completedCourses;
                    })
                    .then(() => {
                      authCtx.setUser({
                        ...user,
                        isLoggedIn: true,
                        password: userCred.password,
                        photoUrl: photoUrl,
                        ongoingCourses: ongoingCourses,
                        preferences: preferences,
                        bookmarks: bookmarks,
                        orders: orders,
                        completedCourses: completedCourses
                      });
                      authCtx.setHistory(props.history);
                    })
                    .catch((e) => console.log("set ongoingCourses", e));
                })
                .catch((e) => console.log("signin-submitHandler", e));
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === "auth/wrong-password") {
          setError("Incorrect password. Try again.");
        } else if (e.code === "auth/network-request-failed") {
          setError("Internet connection is down!!!");
        } else {
          setError("User doesn't exist. Please do register.");
        }
      });
  };

  const sendResetMail = (email) => {
    // to sent continuURL, check below link. Now i think, its not needed
    // https://stackoverflow.com/questions/55296314/firebase-redirect-to-webpage-after-successful-password-change
    // console.log(email);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("successfuly send password rest mail");
        setForgotModal(false);
      })
      .catch((e) => {
        console.log(e);
        if (e.code === "auth/user-not-found") {
          alert("Provide Correct Email Address");
        }
      });
  };

  const forceLogout = () => {
    if (
      window.confirm(
        "Are u sure want to logout from other device?. If 'yes', press OK. Else press cancel."
      )
    ) {
      console.log("forceLogout", userId);
      db.collection("students")
        .doc(userId)
        .update({
          isLoggedIn: false
        })
        .then(() => {
          console.log("successfully update");
          setError(false);
          alert("Logged out from other devices, Please login now!!!");
        });
    } else {
      console.log("you pressed cancel!!!");
    }
  };

  return (
    <>
      <div className="slider-container">
        <Link className={classes.homebtt} to="/dashboard/home">
          <i class="fas fa-home"></i>
          {/* Home */}
        </Link>
        {forgotModal && (
          <ForgotPassModal
            sendResetMail={sendResetMail}
            closeModal={() => setForgotModal(false)}
          />
        )}
        <div className="left-slide">
          <div class="left-bg" className={classes.leftbg1}>
            <h1 style={{ left: "16%" }}>Nhân viên đăng nhập</h1>
            <p style={{ marginLeft: "30px" }}>
              Bạn không phải nhân viên ? Nhấn đây

            </p>
            <p></p>
          </div>
          <div class="left-bg" className={classes.leftbg2}>
            <h1>Khách hàng đăng nhập</h1>
            <p style={{ marginLeft: "60px" }}>
              Bạn không phải người dùng ? Nhấn đây

            </p>
            <p></p>
          </div>
        </div>
        <div className="right-slide">
          <div className="container-fluid">
            <div className="container">
              <form onSubmit={submitHandler}>
                <div className="title">Đăng nhập</div>
                {error && (
                  <>
                    <Alert
                      variant="danger"
                      dismissible
                      onClose={() => setError(false)}
                    >
                      {error}
                    </Alert>
                    {/* force logout from all other devices */}
                    {error ===
                      "Already logged in, logout from other device to login again..." && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={forceLogout}
                        >
                          Force Logout From All Other devices
                        </button>
                      )}
                  </>
                )}
                <div className="input-box underline">
                  <input
                    type="email"
                    placeholder="Nhập địa chỉ Email..."
                    id="email"
                    name="email"
                    required
                    onChange={changeHandler}
                    value={userCred.email}
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Nhập Password..."
                    id="password"
                    name="password"
                    required
                    onChange={changeHandler}
                    value={userCred.password}
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box button">
                  <input type="submit" name="" value="Login" />
                </div>
              </form>
              <p className="or">
                <span>or</span>
              </p>
              <p className="subtitle">
                <button type="button" onClick={() => setForgotModal(true)}>
                  Quên mật khẩu
                </button>
              </p>
              <p className="subtitle">
                Bạn chưa có tài khoản?
                <Link to="/CustomerSignup">Đăng ký</Link>
                {/* <a href="/CustomerSignup">sign Up</a> */}
              </p>
              {/* <div className="social-login">
                  <button className="google-btn">
                    <img
                      alt="Google"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQkJCMDA7IiBkPSJNMTEzLjQ3LDMwOS40MDhMOTUuNjQ4LDM3NS45NGwtNjUuMTM5LDEuMzc4QzExLjA0MiwzNDEuMjExLDAsMjk5LjksMCwyNTYNCgljMC00Mi40NTEsMTAuMzI0LTgyLjQ4MywyOC42MjQtMTE3LjczMmgwLjAxNGw1Ny45OTIsMTAuNjMybDI1LjQwNCw1Ny42NDRjLTUuMzE3LDE1LjUwMS04LjIxNSwzMi4xNDEtOC4yMTUsNDkuNDU2DQoJQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNTE4RUY4OyIgZD0iTTUwNy41MjcsMjA4LjE3NkM1MTAuNDY3LDIyMy42NjIsNTEyLDIzOS42NTUsNTEyLDI1NmMwLDE4LjMyOC0xLjkyNywzNi4yMDYtNS41OTgsNTMuNDUxDQoJYy0xMi40NjIsNTguNjgzLTQ1LjAyNSwxMDkuOTI1LTkwLjEzNCwxNDYuMTg3bC0wLjAxNC0wLjAxNGwtNzMuMDQ0LTMuNzI3bC0xMC4zMzgtNjQuNTM1DQoJYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjhCNDQ2OyIgZD0iTTQxNi4yNTMsNDU1LjYyNGwwLjAxNCwwLjAxNEMzNzIuMzk2LDQ5MC45MDEsMzE2LjY2Niw1MTIsMjU2LDUxMg0KCWMtOTcuNDkxLDAtMTgyLjI1Mi01NC40OTEtMjI1LjQ5MS0xMzQuNjgxbDgyLjk2MS02Ny45MWMyMS42MTksNTcuNjk4LDc3LjI3OCw5OC43NzEsMTQyLjUzLDk4Ljc3MQ0KCWMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGMTQzMzY7IiBkPSJNNDE5LjQwNCw1OC45MzZsLTgyLjkzMyw2Ny44OTZjLTIzLjMzNS0xNC41ODYtNTAuOTE5LTIzLjAxMi04MC40NzEtMjMuMDEyDQoJYy02Ni43MjksMC0xMjMuNDI5LDQyLjk1Ny0xNDMuOTY1LDEwMi43MjRsLTgzLjM5Ny02OC4yNzZoLTAuMDE0QzcxLjIzLDU2LjEyMywxNTcuMDYsMCwyNTYsMA0KCUMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
                      style={{ width: "30px" }}
                    />
                    <p className="btn-text">Sign in with Google</p>
                  </button>
                  <button className="google-btn">
                    <img
                      alt="FB"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI5MS4zMTkgMjkxLjMxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkxLjMxOSAyOTEuMzE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojM0I1OTk4OyIgZD0iTTE0NS42NTksMGM4MC40NSwwLDE0NS42Niw2NS4yMTksMTQ1LjY2LDE0NS42NmMwLDgwLjQ1LTY1LjIxLDE0NS42NTktMTQ1LjY2LDE0NS42NTkNCgkJUzAsMjI2LjEwOSwwLDE0NS42NkMwLDY1LjIxOSw2NS4yMSwwLDE0NS42NTksMHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTE2My4zOTQsMTAwLjI3N2gxOC43NzJ2LTI3LjczaC0yMi4wNjd2MC4xYy0yNi43MzgsMC45NDctMzIuMjE4LDE1Ljk3Ny0zMi43MDEsMzEuNzYzaC0wLjA1NQ0KCQl2MTMuODQ3aC0xOC4yMDd2MjcuMTU2aDE4LjIwN3Y3Mi43OTNoMjcuNDM5di03Mi43OTNoMjIuNDc3bDQuMzQyLTI3LjE1NmgtMjYuODF2LTguMzY2DQoJCUMxNTQuNzkxLDEwNC41NTYsMTU4LjM0MSwxMDAuMjc3LDE2My4zOTQsMTAwLjI3N3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                      style={{ width: "30px" }}
                    />
                    <p className="btn-text">Sign in with Facebook</p>
                  </button>
                </div> */}
            </div>
          </div>
          <div className="container-fluid">
            <div className="container ">
              <form action="#">
                <div className="title">Admin Login</div>
                <div className="input-box underline">
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ Email..."
                    id="usem"
                    required
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Nhập Password"
                    id="pass"
                    required
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box button">
                  <input
                    type="submit"
                    name=""
                    value="Login"
                  // onClick="login(document.getElementById('usem').value,document.getElementById('pass').value)"
                  />
                </div>
              </form>
              <p className="or">
                <span>or</span>
              </p>
              <p className="subtitle">
                Bạn chưa có tài khoản? <a href="#Staffsignup"> Đăng ký</a>
              </p>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button type="button" className="down-button">
            <i className="fas fa-arrow-down"></i>
          </button>
          <button type="button" className="up-button">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Signin);

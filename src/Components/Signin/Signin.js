import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { app } from "../../firebaseConfig";
import "./Signin.css";
import classes from "./Signin.module.css";
import $ from "jquery";
import AuthContext from "../../Context/auth-context";
import ForgotPassModal from "../../UI/ForgotPassword/ForgotPassModal";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector } from 'react-redux'
import { loginUser } from '../../Actions/Actions'
import { useDispatch } from "react-redux";

const Signin = (props) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch()
  $(document).ready(function () {
    const sliderContainer = document.querySelector(".slider-container");
    const slideRight = document.querySelector(".right-slide");
    const slideLeft = document.querySelector(".left-slide");
    let activeSlideIndex = 0;

    $(".left-slide").css("top", "-100vh");

    $(".up-button").click(function () {
      changeSlide("up");
    });

    $(".down-button").click(function () {
      changeSlide("down");
    });


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

  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [forgotModal, setForgotModal] = useState(false);

  const changeHandler = (e) => {
    setUserCred({ ...userCred, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(userCred)
    if (!userCred.email || !userCred.password) {
      alert("Please enter email and password!");
      return;
    }
    app.auth()
    .signInWithEmailAndPassword(userCred.email, userCred.password)
    .then((userCredential) => {
      console.log(userCredential.user.uid)
        const customer_db = app
            .database()
            .ref()
            .child(`/customers/${userCredential.user.uid}`);
        customer_db.once("value", (snap) => {
            if (snap.val()) {
                dispatch(loginUser(snap.val()))
                localStorage.setItem(
                    "user",
                    JSON.stringify(snap.val())
                );
                history.push("/dashboard/home");
            }
            else{
                alert("Có lỗi xảy rả. Vui lòng thử lại!");
            }
        });
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
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
            <h1 style={{ left: "16%" }}>Admin Login</h1>
            <p style={{ marginLeft: "30px" }}>
              Not a Staff ? Click Here
            </p>
            <p></p>
          </div>
          <div class="left-bg" className={classes.leftbg2}>
            <h1>Customer Login</h1>
            <p style={{ marginLeft: "60px" }}>
              Not a customer ? Click Here
            </p>
            <p></p>
          </div>
        </div>
        <div className="right-slide">
          <div className="container-fluid">
            <div className="container">
              <form>
                <div className="title">Customer Login</div>
                <div className="input-box underline">
                  <input
                    type="email"
                    placeholder="Enter Your Email..."
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
                    placeholder="Enter Your Password..."
                    id="password"
                    name="password"
                    required
                    onChange={changeHandler}
                    value={userCred.password}
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box button">
                  <input
                    onClick={handleLogin}
                    type="submit"
                    name=""
                    value="Login"
                  />
                </div>
              </form>
              <p className="or">
                <span>or</span>
              </p>
              <p className="subtitle">
                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                >
                  Forget Password
                </button>
              </p>
              <p className="subtitle">
                Don't have an account?
                <Link to="/StudentsSignup">sign Up</Link>
              </p>
            </div>
          </div>
          <div className="container-fluid">
            <div className="container ">
              <form action="#">
                <div className="title">Addmin Login</div>
                <div className="input-box underline">
                  <input
                    type="text"
                    placeholder="Type Username or Email"
                    id="usem"
                    required
                  />
                  <div className="underline"></div>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
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
                  />
                </div>
              </form>
              <p className="or">
                <span>or</span>
              </p>
              <p className="subtitle">
                Don't have an account?{" "}
                <a href="#Staffsignup"> sign Up</a>
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
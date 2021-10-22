import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import firebase from "../../Services/firebaseInstitute";
import "./Signup.css";

const InstitutionSignup = () => {
  return (
    <>
      <section
        className="signup-page"
        style={{ backgroundImage: "url(/images/error.jpg)" }}
      >
        <div className="container-fluid">
          <div className="container">
            <div className="title">Institution Signup</div>
            <div className="content">
              <form action="#" name="fname">
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Institute Name</span>
                    <input
                      type="text"
                      placeholder="Enter your Institute Name"
                      id="iname"
                      name="i_name"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Username</span>
                    <input
                      type="text"
                      placeholder="Enter your Username"
                      id="uname"
                      name="u_name"
                      required
                    />
                  </div>
                  <div className="input-box2">
                    <span className="details">Address</span>
                    <div className="input">
                      <textarea
                        placeholder="Enter Your Address"
                        name="adds"
                        id="add"
                        cols="45"
                        style={{ maxWidth: "100%;" }}
                        rows="4"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="input-box">
                    <span className="details">Email</span>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      name="emailid"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Phone Number</span>
                    <input
                      type="text"
                      placeholder="Enter your number"
                      id="ph"
                      name="p_no"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Password</span>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      id="pass"
                      name="pas"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Confirm Password</span>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      id="cpass"
                      name="c_pas"
                      required
                    />
                  </div>
                </div>
                <div className="signupbutton">
                  <button type="button" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstitutionSignup;

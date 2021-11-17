import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import "./Signup.css";
import { app } from "../../firebaseConfig";
import { useHistory } from "react-router";
const StudentsSignup = (props) => {
    const history = useHistory();
    const [userDetails, serUserDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
 

    const changeHandler = (e) => {
        serUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };
    const handleRegister = (e) => {
        e.preventDefault();
        if (
            !userDetails.email ||
            !userDetails.password ||
            !userDetails.fname ||
            !userDetails.lname ||
            !userDetails.phone
        ) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        app.auth()
            .createUserWithEmailAndPassword(
                userDetails.email,
                userDetails.password
            )
            .then((userCredential) => {
                const data = {
                    customerId: userCredential.user.uid,
                    email: userDetails.email,
                    joinDate: Date.now(),
                    name: userDetails.fname + userDetails.lname,
                    phone: userDetails.phone,
                };
                const customer_db = app
                    .database()
                    .ref()
                    .child(`/customers/${userCredential.user.uid}`);
                customer_db.set(data, (callback) => {
                    const r = confirm(
                        "Đăng kí tài khoản thành công! Đăng nhập ngay."
                    );
                    if (r == true) {
                        history.push("/login");
                    }
                });
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    };

    return (
        <>
            <section
                className="signup-page"
                style={{ backgroundImage: "url(/images/error.jpg)" }}
            >
                <div className="container-fluid">
                    <div className="container">
                        <div className="title">Signup</div>
                        <div className="content">
                            <form name="fname">
                                <div className="user-details">
                                    <div className="input-box">
                                        <span className="details">
                                            First Name
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Enter your First Name"
                                            id="fname"
                                            name="fname"
                                            required
                                            autoFocus
                                            onChange={changeHandler}
                                            value={userDetails.fname}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">
                                            Last Name
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Enter your Last Name"
                                            id="lname"
                                            name="lname"
                                            required
                                            onChange={changeHandler}
                                            value={userDetails.lname}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Email</span>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            id="email"
                                            name="email"
                                            required
                                            onChange={changeHandler}
                                            value={userDetails.email}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">
                                            Phone Number
                                        </span>
                                        <input
                                            type="tel"
                                            placeholder="Enter your number"
                                            id="phone"
                                            name="phone"
                                            required
                                            onChange={changeHandler}
                                            value={userDetails.phone}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">
                                            Password
                                        </span>
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            id="password"
                                            name="password"
                                            required
                                            onChange={changeHandler}
                                            value={userDetails.password}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">
                                            Confirm Password
                                        </span>
                                        <input
                                            type="password"
                                            placeholder="Confirm your password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            onChange={changeHandler}
                                            value={userDetails.confirmPassword}
                                        />
                                    </div>
                                </div>
                                <div className="button">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={(e) => {
                                            handleRegister(e);
                                        }}
                                    >
                                        Register
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                    >
                                        Cancel
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

const Signup = (props) => {
    return (
        <>
            <StudentsSignup {...props} />
        </>
    );
};
export default Signup;

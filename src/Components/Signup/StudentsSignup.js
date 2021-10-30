import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { db, auth } from "../../Services/firebase";
import "./Signup.css";

const StudentsSignup = (props) => {
  // let db = dbStudent.firestore();
  const [error, setError] = useState("");
  const [isAgeGreater, setAgeGreater] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    parentNo: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    
  }, []);

  const changeHandler = (event) => {
    let val = event.target.value;
    if (event.target.name === "dob") {
      calculateAge(val);
    }
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val
      };
    });
  };

  const calculateAge = (dob) => {
    console.log("DOB", dob);
    dob = new Date(dob);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    console.log("age", age);
    if (age < 18) {
      setAgeGreater(true);
    } else {
      setAgeGreater(false);
    }
  };

  // new user signup
  const signUpAuth = (event) => {
    // add a loader to know its processing...
    event.preventDefault();
    // console.log(event.target);
    // console.log(userDetails.password.length);
    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match");
    } else if (
      userDetails.password === "" ||
      userDetails.confirmPassword === ""
    ) {
      setError("Enter valid passwords");
    } else if (
      userDetails.password.length < 8 ||
      userDetails.confirmPassword.length < 8
    ) {
      setError("Password length should be atleast 8.");
    }
    // else if (!userDetails.phone.match("+[0-9]{10}")) {
    //   setError("Phone number should not contain alphabets.");
    // }
    else {
      // props.history.replace("/");
      // console.log(props);
      // console.log("check email already exist and success", userDetails);
      // check the email is already registered
      auth
        .createUserWithEmailAndPassword(
          userDetails.email.trim(),
          userDetails.password.trim()
        )
        .then((userCred) => {
          let studentId = userCred.user.uid;
          const user = auth.currentUser;
          user.updateProfile({
            displayName: userDetails.fname + " " + userDetails.lname
          });

          db.collection("students")
            .doc(studentId)
            .set({
              id: studentId,
              name: userDetails.fname + " " + userDetails.lname,
              email: userDetails.email,
              phone: userDetails.phone,
              dob: userDetails.dob,
              password: userDetails.password,
              parentNo: userDetails.parentNo,
              photoUrl: "https://www.w3schools.com/howto/img_avatar.png",
              isLoggedIn: false
            })
            .then((docRef) => {
              db.collection("students")
                .doc(studentId)
                .collection("userCourseDetails")
                .doc("courseDetails")
                .set({
                  id: "courseDetails",
                  ongoingCourses: [],
                  preferences: [],
                  bookmarks: [],
                  orders: [],
                  completedCourses: []
                })
                .then((docRef) => {
                  console.log("successfully created user & course details");
                })
                .catch((e) => console.log(e));

              setError("");
              setUserDetails({
                id: "",
                fname: "",
                lname: "",
                email: "",
                phone: "",
                dob: "",
                parentNo: "",
                password: "",
                confirmPassword: ""
              });
              // console.log("successfully updated to firestore.");
              props.history.replace("/login"); // push to login
            })
            .catch((e) => console.log(e, "firestore"));
        })
        .catch((e) => {
          if (e.code === "auth/email-already-in-use") {
            setError("Email already exists!!! Try with different email.");
            setUserDetails({
              id: userDetails.id,
              fname: userDetails.fname,
              lname: userDetails.lname,
              email: "",
              dob: "",
              parentNo: "",
              phone: userDetails.phone,
              password: "",
              confirmPassword: ""
            });
          } else {
            console.log(e, "create_authentication");
            setError("");
            setUserDetails({
              id: "",
              fname: "",
              lname: "",
              email: "",
              phone: "",
              dob: "",
              parentNo: "",
              password: "",
              confirmPassword: ""
            });
          }
        });
      // other things
    }
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
              <form name="fname" onSubmit={signUpAuth}>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">First Name</span>
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
                    <span className="details">Last Name</span>
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
                    <span className="details">Phone Number</span>
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
                    <span className="details">Password</span>
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
                    <span className="details">Confirm Password</span>
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
                  <div className="input-box">
                    <span className="details">DOB</span>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      required
                      onChange={changeHandler}
                      value={userDetails.dob}
                    />
                  </div>
                  {isAgeGreater && (
                    <div className="input-box">
                      <span className="details">Parent No</span>
                      <input
                        type="tel"
                        id="parentNo"
                        name="parentNo"
                        required
                        onChange={changeHandler}
                        value={userDetails.parentNo}
                      />
                    </div>
                  )}
                </div>
                <div className="button">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => props.history.push("/login")}
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

const InstitutionSignup = () => {
  return (
    <>
      <section className="signup-page">
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
                <div className="button">
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

const Signup = (props) => {
  return (
    <>
      <StudentsSignup {...props} />
      {/* <InstitutionSignup /> */}
    </>
  );
};
export default Signup;

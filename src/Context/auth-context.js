import React, { useState, useEffect } from "react";
import { auth, db } from "../Services/firebase";
// import { useHistory } from "react-router-dom";
// import history from "../Helpers/history";

const AuthContext = React.createContext({
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    photoUrl: "", // from auth
    parentPhone: "",
    preferences: [],
    bookmarks: [],
    orders: [],
    completedCourses: [],
    ongoingCourses: []
  },
  isLoggedIn: false,
  setUser: (user) => {},
  setIsLoggedIn: () => {},
  logout: () => {},
  history: "",
  setHistory: () => {}
});

export const AuthContextProvider = (props) => {
  // in db collection will be students, but in all other places it willl be user in end-user application
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState(null);
  // set ongoing doc id to reduce read, intialy store it once and use it everywhere
  // const [ongoingCourseIds, setOngoingCourseIds] = useState(null);

  auth.onAuthStateChanged((user) => {
    console.log("uauthChange-user", user);
    if (user !== null) {
      db.collection("students")
        .doc(user.uid)
        .onSnapshot((doc) => {
          console.log(
            "snapsho-userID-before",
            sessionStorage.getItem("userId")
          );
          console.log("snapshot", doc.data());
          console.log("snapsho-userID", sessionStorage.getItem("userId"));
          // console.log('sncap', doc.)
          if (user.uid === doc.data().id) {
            // localStorage, bcs when the user, closes the window, sessionStorage will be destroyed
            // but localStorage will be there, if thats the case, we can delete it

            // try with sessionStorage, cahnge to locaStoarage, if not working as expected
            if (
              sessionStorage.getItem("userId") !== null &&
              doc.data().isLoggedIn === false
            ) {
              localStorage.removeItem("userId");
              sessionStorage.removeItem("userId");
              alert(
                "Sorry You have been logged out by other user, If you dont want to face this kind of issue, plese dont share your username & password"
              );
              // window.preventDefault();
              window.location.href = "/login";
            }
          }
        });
      // }
    }
  });

  useEffect(() => {
    console.log("authcontext useEffect", localStorage.getItem("userId"));
    //
    console.log("currentUser", auth.currentUser);
    console.log("auth-context--------", localStorage.getItem("userId"));
    if (
      // localStorage.getItem("userId") !== null &&
      sessionStorage.getItem("userId") !== null
    ) {
      auth.onAuthStateChanged((user) => {
        if (user !== null) {
          // refreshed the page, not logged out yet
          console.log(
            "Auth-Context: refreshed the page, not logged out yet",
            user.displayName
          );
          let userId = user.uid;
          // let photoUrl = user.photoURL;
          let photoUrl = "";
          db.collection("students")
            .doc(userId)
            .get()
            .then((doc) => {
              // console.log("snapshot", doc.data());
              let user = doc.data();
              photoUrl = user.photoUrl;
              console.log("usr", user);
              //for me its comming like 405 error  sanjay? hello

              // we should check the button, whats happening

              // to identify, whether reloading or closing the tab
              // sessionStorage.setItem("userId", userId);
              // checking if any other person is logged in
              // if (user.isLoggedIn) {
              //   console.log("user.isLoggedIn---false");
              //   // history.replace("/login?action=1");
              //   setIsLoggedIn(false);
              // } else {
              //   console.log("user.isLoggedIn---true");
              //   setIsLoggedIn(true);
              // }
              setIsLoggedIn(true);

              // should also capture ongoing courses that will get later
              // return user;
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
                  setUser({
                    ...user,
                    isLoggedIn: true,
                    photoUrl: photoUrl,
                    ongoingCourses: ongoingCourses,
                    preferences: preferences,
                    bookmarks: bookmarks,
                    orders: orders,
                    completedCourses: completedCourses
                  });
                })
                .catch((e) => console.log("set ongoingCourses", e));
            })
            .then(() => {
              console.log("ongoingcoursesssss");
            })
            .catch((e) => console.log("auth-context", e));
        } else {
          // logged out, so no user
          console.log("user is not logged in");
          history.replace("/login");
        }
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const setMyUser = (user) => {
    console.log("Setting User", user);
    setUser(user);
  };

  const setLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  const setHistoryProp = (history) => {
    setHistory(history);
  };

  const logoutHandler = () => {
    // Assume that the user/student id is set, when logged in
    // so using that id itself, to get that document
    let userId = localStorage.getItem("userId");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    localStorage.removeItem("latestSectionTopic");
    sessionStorage.removeItem("updatedQues");
    try {
      db.collection("students")
        .doc(user.id)
        .update({
          isLoggedIn: false
        })
        .then(() => {
          // localStorage.removeItem("userId");
          setIsLoggedIn(false);
          // auth is here bcs, if we logout using auth, then we cant access the firestore
          auth
            .signOut()
            .then(() => {
              console.log("signed out successfully!!!");
              // delete the userId, which we save in localstorage

              // console.log("history", history);
              // can move it up, to show up faster to the user
              history.replace("/login");
            })
            .catch((e) => console.log("logout-authContext", e));
        })
        .catch((e) => console.log("logout-authContext", e));
    } catch (err) {
      console.log(err);
      localStorage.setItem("userId", userId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setMyUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setLoggedIn,
        logout: logoutHandler,
        history: history,
        setHistory: setHistoryProp
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

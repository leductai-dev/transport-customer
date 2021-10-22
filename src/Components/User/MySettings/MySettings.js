import React from "react";
import { db, auth, firebase } from "../../../Services/firebase";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PersonalDetails from "./PersonalDetails";
import ChangePassword from "./ChangePassword";
import $ from "jquery";

const MySettings = (props) => {
  const updateUser = (newData) => {
    // console.log("updating user details", newData);
    let authUser = props.authCtx.user;
    let name = authUser.name;
    let phone = authUser.phone;
    // only image is updated
    // both udpated
    if (newData.prfl_img !== undefined && newData.prfl_img !== null) {
      // version - 8
      let bucketName = "images";
      let img = newData.prfl_img;
      let storageRef = firebase.storage().ref();
      let timestamp = +new Date().getTime() + "-" + newData.prfl_img.name;
      console.log("timestamp", timestamp);
      let imgRef = storageRef.child(`${bucketName}/${timestamp}`);
      // let photoUrl = "";
      // delete previous photo from storage, but not the default photo
      imgRef
        .put(img)
        .then((snapshot) => {
          imgRef.getDownloadURL().then((imgUrl) => {
            // photoUrl = imgUrl;
            db.collection("students")
              .doc(authUser.id)
              .update({
                name: newData.name,
                phone: newData.mno,
                photoUrl: imgUrl
              })
              .then(() => {
                if (
                  authUser.photoUrl !==
                  "https://www.w3schools.com/howto/img_avatar.png"
                ) {
                  firebase
                    .storage()
                    .refFromURL(authUser.photoUrl)
                    .delete()
                    .then(() =>
                      console.log(
                        "image deleted successfullty from firebase storage"
                      )
                    );
                }
                alert("successfully updated");
                // console.log("successfully updated data to db");
                props.authCtx.setUser({
                  ...authUser,
                  name: newData.name,
                  phone: newData.mno,
                  photoUrl: imgUrl
                });

                document.getElementById("img").value = "";
                $("#uploadButton").css("background-image", 'url("")');
              })
              .catch((e) => console.log("getDownloadUrl", e));
          });
        })
        .catch((e) => {
          console.log("img put", e);
        });
    } else {
      // no img
      if (name !== newData.name || phone !== newData.mno) {
        db.collection("students")
          .doc(authUser.id)
          .update({
            name: newData.name,
            phone: newData.mno
          })
          .then(() => {
            alert("successfully updated");
            console.log("successfully updated data to db");
            props.authCtx.setUser({
              ...authUser,
              name: newData.name,
              phone: newData.mno
            });
          })
          .catch((e) => console.log(e));
      } else {
        alert("change anything to update!!!");
      }
    }
    // } else {
    //   // User is signed out
    //   // ...
    // }
    // });
  };

  const updatePassword = (password) => {
    console.log("newPas", password);
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        user
          .updatePassword(password)
          .then(() => {
            db.collection("students")
              .doc(user.uid)
              .update({
                password: password
              })
              .then(() => {
                let user = props.authCtx.user;
                props.authCtx.setUser({
                  ...user,
                  password: password
                });
                console.log("password successfully updated!!!");
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => {
            if (e.code === "auth/requires-recent-login") {
              alert(
                "Changing sensitive information, So please try again immediately after login. If password is wrong, try with new password you tried."
              );
            }
            console.log(e);
          });
      }
    });
  };

  return (
    <>
      <PersonalDetails authCtx={props.authCtx} updateUser={updateUser} />
      <ChangePassword authCtx={props.authCtx} updatePassword={updatePassword} />
    </>
  );
};

export default MySettings;

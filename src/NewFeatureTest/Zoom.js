// import React, { useEffect } from "react";
// // import "./Zoom.css";
// // import { ZoomMtg } from "@zoomus/websdk";
// // import '../styles.css';
// // const { ZoomMtg } = React.lazy(() => import("@zoomus/websdk"));
// // import { ZoomMtg } from "../NewFeatureTest/zoom-meeting-1.9.9.min.js";

// const crypto = require("crypto"); // crypto comes with Node.js

// function generateSignature(apiKey, apiSecret, meetingNumber, role) {
//   return new Promise((res, rej) => {
//     // Prevent time sync issue between client signature generation and zoom
//     const timestamp = new Date().getTime() - 30000;
//     const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
//       "base64"
//     );
//     const hash = crypto
//       .createHmac("sha256", apiSecret)
//       .update(msg)
//       .digest("base64");
//     const signature = Buffer.from(
//       `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
//     ).toString("base64");

//     res(signature);
//   });
// }

// // // pass in your Zoom JWT API Key, Zoom JWT API Secret, Zoom Meeting Number, and 0 to join meeting or webinar or 1 to start meeting
// // console.log(
// //   generateSignature(process.env.API_KEY, process.env.API_SECRET, 123456789, 0)
// // );

// const Zoom = (props) => {
//   // var signatureEndpoint = "http://localhost:4000";
//   // var apiKey = "_KqJ2LhdS72IEtQxkgIePg";
//   // var apiSecret = "is6KgZKTYTZDw1Cs1R4RQyYWrkIKNoLH7lPm";
//   var apiKey = "_KqJ2LhdS72IEtQxkgIePg";
//   var apiSecret = "is6KgZKTYTZDw1Cs1R4RQyYWrkIKNoLH7lPm";
//   var meetingNumber = 0;
//   var role = 0;
//   var leaveUrl = "https://ndd4c.csb.app";
//   var userName = "";
//   var userEmail = "";
//   var passWord = "";

//   var signature = "";

//   useEffect(() => {
//     console.log("meetings", props.meetingDetails);
//     const meet = props.meetingDetails;
//     meetingNumber = parseInt(meet.meetingId);
//     passWord = meet.meetingPassword;
//     userName = meet.userName;
//     userEmail = meet.userEmail;
//     generateSignature(apiKey, apiSecret, meetingNumber, role).then((res) => {
//       signature = res;
//       showZoomDiv();
//       ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.9/lib", "/av");
//       ZoomMtg.preLoadWasm();
//       ZoomMtg.prepareJssdk();
//       initiateMeeting();
//     });
//   }, []);

//   const showZoomDiv = () => {
//     if (document.getElementById("zmmtg-root") !== null) {
//       document.getElementById("zmmtg-root").style.display = "block";
//     }
//     // document.getElementById("zmmtg-root").style.display = "block";
//   };

//   const initiateMeeting = () => {
//     ZoomMtg.init({
//       leaveUrl: leaveUrl,
//       isSupportAV: true,
//       success: (success) => {
//         console.log(success);

//         ZoomMtg.join({
//           signature: signature,
//           meetingNumber: meetingNumber,
//           userName: userName,
//           apiKey: apiKey,
//           userEmail: userEmail,
//           passWord: passWord,
//           success: (success) => {
//             console.log(success);
//           },
//           error: (error) => {
//             console.log(error);
//           }
//         });
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });
//   };

//   return <div>Zoom</div>;
// };

// export default Zoom;

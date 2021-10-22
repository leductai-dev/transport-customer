import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Zoom from "../../../NewFeatureTest/Zoom";
// const Zoom = React.lazy(() => import("../../../NewFeatureTest/Zoom"));
import "./SingleCourseLive.css";

const SingleCourseLive = (props) => {
  // return (
  //   <div>
  //     <h1 style={{ padding: "100px" }}>Zoom</h1>
  //     <Link to='/live'>Join meeting</Link>
  //   </div>
  // );

  // const [joinMeeting, setJoinMeeting] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    meetingId: "",
    meetingName: "",
    meetingPassword: "",
    meetingDuration: "",
    meetingDate: "",
    meetingStatus: "",
    meetingTime: "",
    userName: "",
    userEmail: ""
  });

  useEffect(() => {
    // console.log("Single Course Live");
    let meetings = props.course.meetings;
    let meet = meetings[meetings.length - 1];
    let user = props.authCtx.user;
    let meetDet = {
      meetingId: meet.meetingId,
      meetingName: meet.meetingName,
      meetingPassword: meet.meetingPassword,
      meetingDuration: meet.meetingDuration,
      meetingDate: meet.meetingDate,
      meetingStatus: meet.meetingStatus,
      meetingTime: meet.meetingTime,
      userName: user.name,
      userEmail: user.email
    };
    setMeetingDetails(meetDet);
    let currentDT = new Date().toISOString();
    let dotInd = currentDT.lastIndexOf(".");
    currentDT = currentDT.substring(0, dotInd);
    let meetDT = meet.meetingDate + "T" + meet.meetingTime;
    if (currentDT > meetDT) {
      console.log("currentDT > meetDT", currentDT > meetDT);
      document.getElementById("meetstatus").innerHTML =
        "Meeting Ended, Wait for next meeting!!!";
    } else {
      console.log("currentDT < meetDT", currentDT < meetDT);
      document.getElementById("meetstatus").innerHTML =
        "Meeting will start at the respective time & date!!!";
    }

    console.log("course", meetDet, currentDT, meetDT);
  }, [props.authCtx.user, props.course.meetings]);

  return (
    <>
      <div class="live-page">
        <h1 class="title">Welcome to the live section</h1>
        <h2 class="title">Your section will start shortly</h2>
        <div class="row">
          <div class="col-sm-6">
            <img class="img-fluid" src="" alt="courseimage" />
          </div>
          <div class="col-sm-6">
            No Of Days Remaining:{" "}
            {props.remainingDays === -1 ? "Lifetime" : props.remainingDays}
            <p id="meetstatus"></p>
            <p>Meeting Id: {meetingDetails.meetingId}</p>
            <p>Meeting Topic: {meetingDetails.meetingName}</p>
            {/* <p>Meeting password: {meetingDetails.meetingPassword}</p> */}
            <p>Meeting duration: {meetingDetails.meetingName}</p>
            <p>Meeting Date: {meetingDetails.meetingDate}</p>
            <p>Meeting Time: {meetingDetails.meetingTime}</p>
            <p>Meeting Status: {meetingDetails.meetingStatus}</p>
          </div>
        </div>
        <div class="live-footer">
          {/* <form
          class="live-footer"
          action={`https://hosted.campuzone.com/zoom?meetingId=${meetingDetails.meetingId}&meetingPassword=${meetingDetails.meetingPassword}&userName=${meetingDetails.userName}&userEmail=${meetingDetails.userEmail}`}
          // method="post"
        >
          <button class="live-btn" type="submit">
            Join meeting
          </button> */}
          <a
            class="live-btn"
            href={`https://hosted.campuzone.com/zoom?meetingId=${meetingDetails.meetingId}&meetingPassword=${meetingDetails.meetingPassword}&userName=${meetingDetails.userName}&userEmail=${meetingDetails.userEmail}`}
          >
            Join meeting
          </a>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default SingleCourseLive;

import React from "react";
import ProfileCard from "./ProfileCard";

const MyProfile = (props) => {
  return (
    <div class="row m-0">
      <ProfileCard {...props} />
    </div>
  );
};

export default MyProfile;

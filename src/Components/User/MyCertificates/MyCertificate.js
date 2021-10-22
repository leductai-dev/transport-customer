import React from "react";
import MyCertificatesView from "./MyCertificatesView";

const MyCertificate = () => {
  return (
    <div class="marked">
      <div class="row p20">
        <MyCertificatesView />
        <MyCertificatesView />
        <MyCertificatesView />
      </div>
    </div>
  );
};

export default MyCertificate;

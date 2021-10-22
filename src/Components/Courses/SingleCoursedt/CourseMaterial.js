import React, { useEffect, useState } from "react";
import PdfViewer from "../../../UI/PdfViewer/PdfViewer";

const CourseMaterial = (props) => {
  const [material, setMaterial] = useState(null);
  // useEffect(() => {
  //   console.log("materials", props.topic.materials);
  // }, [props.topic]);

  let ui = null;
  if (props.topic.materials.length === 0) {
    ui = <p>Materials Is Not Available For This Topic</p>;
  } else {
    ui = props.topic.materials.map((material, i) => {
      return (
        <div
          class="row"
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => setMaterial(material)}
        >
          <img class="img-fluid" src="/images/pdf.png" alt="pdf" />
          <p class="file-name">{material.fileName}</p>
          {/* <a href="#ld" download>
            <i class="fas fa-file-download"></i>
          </a> */}
        </div>
      );
    });
  }

  const handleKeys = (e) => {
    console.log("keys", e);
  };

  return (
    <>
      <>
        {material && (
          <div class="scroll-fixed">
            <PdfViewer material={material} close={() => setMaterial(null)} />
          </div>
        )}
        <div class="material">
          {ui}
          {/* <div class="row">
        <img class="img-fluid" src="/images/word.png" alt="pdf"/>
        <p class="file-name">File Name</p>
        <a href="#ld" download>
          <i class="fas fa-file-download"></i>
        </a>
      </div> */}
        </div>
      </>
    </>
  );
};

export default CourseMaterial;

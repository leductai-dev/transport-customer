import React, { useEffect, useState } from "react";
import "./CourseCaptions.css";

const CourseCaptions = (props) => {
  const [captions, setCaptions] = useState(null);

  useEffect(() => {
    let captions = props.topic.captions;
    captions.sort((a, b) => {
      let nameA = a.timing;
      let nameB = b.timing;
      // console.log(nameA, nameB);
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    // console.log("sorted captions", captions);
    setCaptions(captions);
  }, [props.topic]);

  const onClickHandler = (caption) => {
    // console.log("caption", caption);
    props.setCaption(caption);
  };

  let captionUI = null;
  if (captions === null) {
    captionUI = null;
  } else {
    if (captions.length !== 0) {
      captionUI = captions.map((caption) => {
        return (
          <p
            className="short-descrb caption"
            key={caption.timing}
            onClick={() => onClickHandler(caption)}
          >
            {caption.caption}
          </p>
        );
      });
    } else {
      captionUI = <p>No captions available for this topic!!!</p>;
    }
  }

  return <>{captionUI}</>;
};

export default CourseCaptions;

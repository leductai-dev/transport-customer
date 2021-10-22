import React, { useEffect, useState } from "react";
import "./PdfViewer.css";
import { Page, Document, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // import PDF from "./";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// using ES6 modules
// using ES6 modules
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PdfViewer = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // useEffect(() => {
  //   console.log("materials details", props.material);
  // }, [props.material]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  window.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      switch (event.key) {
        // case "Down": // IE/Edge specific value
        // case "ArrowDown":
        //   // Do something for "down arrow" key press.
        //   break;
        // case "Up": // IE/Edge specific value
        // case "ArrowUp":
        //   // Do something for "up arrow" key press.
        //   break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          // Do something for "left arrow" key press.
          setPageNumber((prevState) => {
            // console.log("prevState", prevState);
            if (prevState <= 1) {
              return prevState;
            } else {
              return prevState - 1;
            }
          });
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          // Do something for "right arrow" key press.
          setPageNumber((prevState) => {
            if (prevState >= numPages) {
              return prevState;
            } else {
              return prevState + 1;
            }
          });
          break;
        case "Enter":
          // Do something for "enter" or "return" key press.
          setPageNumber((prevState) => {
            if (prevState >= numPages) {
              return prevState;
            } else {
              return prevState + 1;
            }
          });
          break;
        case "Esc": // IE/Edge specific value
        case "Escape":
          // Do something for "esc" key press.
          props.close();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }

      // Cancel the default action to avoid it being handled twice
      // event.preventDefault();
    },
    true
  );

  // const handleKeys = (e) => {
  //   console.log("keys", e.key);
  // };

  return (
    <div className="pdf" tabIndex="0">
      <span style={{ cursor: "pointer" }} onClick={props.close}>
        <i className="fas fa-times"></i>Close
      </span>
      <Document
        className="viewer"
        file={`https://secure--storage.s3.ap-south-1.amazonaws.com/${props.material.materialURL}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="pdf-controls">
        <span
          onClick={() =>
            setPageNumber((prevState) => {
              console.log("prevState", prevState);
              if (prevState <= 1) {
                return prevState;
              } else {
                return prevState - 1;
              }
            })
          }
        >
          <i className="fas fa-chevron-left"></i>
        </span>
        <span
          onClick={() =>
            setPageNumber((prevState) => {
              if (prevState >= numPages) {
                return prevState;
              } else {
                return prevState + 1;
              }
            })
          }
        >
          <i className="fas fa-chevron-right"></i>
        </span>
      </div>
    </div>
  );
};

export default PdfViewer;

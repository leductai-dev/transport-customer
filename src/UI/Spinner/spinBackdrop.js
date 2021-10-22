// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import Card from "./card";

// // import classes from "./BackDropModal.module.css";

// const Backdrop = (props) => {
//   return <div className={classes.backdrop} onClick={props.onClose} />;
// };

// const ModalOverlay = (props) => {
//   return (
//     <Card className={classes.modal}>
//       <div id="backdrop">
//         <div class="text-center loading">
//           <div class="spinner-border" role="status">
//             <span class="sr-only"></span>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const Spinners = (props) => {
//   return (
//     <React.Fragment>
//       {ReactDOM.createPortal(
//         <Backdrop onClose={props.closeModal} />,
//         document.getElementById("backdrop-root")
//       )}
//       {ReactDOM.createPortal(
//         <ModalOverlay />,
//         document.getElementById("overlay-root")
//       )}
//     </React.Fragment>
//   );
// };

// export default Spinners;

import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function Toast(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (props.fromCache) {
      setOpen(true);
    }
  }, [props.fromCache]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={props.duration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {props.error} - {props.msg}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}

// import React from "react";

// const Toast = (props) => {
//   let error = null;
//   if (props.error === "Internet Down!") {
//     error = (
//       <img
//         src="https://img.icons8.com/ios-filled/50/000000/without-internet.png"
//         alt="no internet"
//       />
//     );
//   }
//   return (
//     <div
//       aria-live="polite"
//       aria-atomic="true"
//       style={{ position: "relative", minHeight: "200px" }}
//     >
//       <div class="toast" style={{ position: "absolute", top: "0", right: "0" }}>
//         <div class="toast-header">
//           {error}
//           <strong class="mr-auto">{props.error}</strong>
//           <small>{props.time}</small>
//           <button
//             type="button"
//             class="ml-2 mb-1 close"
//             data-dismiss="toast"
//             aria-label="Close"
//           >
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div class="toast-body">{props.msg}</div>
//       </div>
//     </div>
//   );
// };

// export default Toast;

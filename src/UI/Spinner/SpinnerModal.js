import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const SpinnerModal = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
};

export default SpinnerModal;

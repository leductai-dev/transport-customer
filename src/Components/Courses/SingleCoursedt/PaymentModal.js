import React from "react";
import ReactDOM from "react-dom";
import Card from "../../../UI/Card/Card";
import classes from "./PaymentModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div class="payment-modal">
      <h2 class="title">{props.course.courseName}</h2>
      <div class="row">
        <p class="cat">
          Category: <span>{props.course.category}</span>
        </p>
        <p class="scat">
          Sub-Category: <span>{props.course.subcategory}</span>
        </p>
      </div>
      <p class="inst">
        Course Provided by <span>{props.course.instituteName}</span>
      </p>
      <p class="duration">
        Duration of the Course:{" "}
        <span>
          {props.price.period === -1
            ? "Lifetime"
            : props.price.period + " Days"}
        </span>
      </p>
      <p class="amount">
        Amout to be paid: <span>Rs. {props.price.discountedPrice}</span>
      </p>
      <div class="btn-set">
        <button type="submit" class="btn" onClick={props.purchaseCourse}>
          Proceed
        </button>
        <button type="submit" class="btn" onClick={props.onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const PaymentModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          price={props.price}
          course={props.course}
          purchaseCourse={props.purchaseCourse}
          onClose={props.onClose}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default PaymentModal;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";

import "./QuizOverlay.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  // $("#img").hide();
  useEffect(() => {
    console.log("modaloverlay - quiz", props.quiz);
    console.log("modaloverlay - answers", props.answers);
    console.log("modaloverlay - percentage", props.percentage);
  }, []);
  return (
    <Card className="Modal">
      <div className="qoverlay">
        <div className="scroll">
          <h2>Your Answers</h2>
          <p className="marks">
            {props.percentage.count} / {props.percentage.totalQues}{" "}
          </p>
          {/* className- correct-ans / wrong-ans */}
          {props.quiz.map((q, i) => {
            return (
              <div className="ans-set" key={i}>
                <p className="quest">{q.question}</p>
                <p
                  className={
                    props.answers[q.question] === q.answer
                      ? "correct-ans"
                      : "wrong-ans"
                  }
                >
                  {q.answer}
                </p>
              </div>
            );
          })}
          <button
            className="btn btn-primary"
            onClick={props.onContinue}
            title="Continue to next video!!!"
          >
            Continue
          </button>
          &ensp;
          <button
            className="btn btn-primary"
            onClick={props.onClose}
            title="Exit and re-attend the quiz!!!"
          >
            Exit
          </button>
        </div>
      </div>
    </Card>
  );
};

const QuizOverlay = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.closeModal}
          onContinue={props.onContinue}
          quiz={props.quiz}
          answers={props.answers}
          percentage={props.percentage}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default QuizOverlay;

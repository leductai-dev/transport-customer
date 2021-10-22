import React, { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";

const IdleTimerContainer = (props) => {
  const idleTimerRef = useRef(null);
  const [timeoutDuration, setTimeoutDuration] = useState(1000 * 60 * 15); // 15mins

  const onIdleHandler = () => {
    console.log("user is idle...");
    if (props.timeout) {
      props.handleLogout();
    } else {
      props.timeoutModal(); // opens the modal
      idleTimerRef.current.reset();
      props.timedoutHandler(true); // after the modal, if they are not responding then
    }
    // props.timeoutModal(); // opens the modal
  };

  const onActiveHandler = () => {
    console.log("user is active...");
    props.timedoutHandler(false);
  };

  // const onActionHandler = () => {
  //   console.log("user action...");
  //   props.timedoutHandler(false);
  // };

  return (
    <IdleTimer
      ref={idleTimerRef}
      timeout={timeoutDuration} // {1000 * 60 * 15}, {1000 * 5 * 1}
      onIdle={onIdleHandler}
      onActive={onActiveHandler}
      // onAction={onActionHandler}
    />
  );
};

export default IdleTimerContainer;

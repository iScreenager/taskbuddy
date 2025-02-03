import React, { useEffect, useState } from "react";
import "./Warning.css";
import close from "../../assets/close_icon.png";

const Warning = (props) => {
  const [timeCounter, setTimeCounter] = useState(5);

  useEffect(() => {
    if (timeCounter === 0) {
      props.onClose();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props, timeCounter]);

  return (
    <div className="warning_container">
      <p>{props.message}</p>
      <img
        onClick={props.onClose}
        src={close}
        alt="close"
        className="close_icon"
        draggable="false"
      />
      <div className="progress"></div>
    </div>
  );
};

export default Warning;

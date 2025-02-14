import React, { useEffect, useState } from "react";
import "./Warning.css";
import close from "../../assets/close_icon.png";

interface WarningProps {
  message: string;
  onClose: () => void;
}

const Warning = ({ message, onClose }: WarningProps) => {
  const [timeCounter, setTimeCounter] = useState(5);

  useEffect(() => {
    if (timeCounter === 0) {
      onClose();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onClose, timeCounter]);

  return (
    <div className="warning_container">
      <p>{message}</p>
      <img
        onClick={onClose}
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

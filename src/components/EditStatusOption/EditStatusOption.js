import "./EditStatusOption.css";
import { useTask } from "../../hooks/useTask";
import { useEffect, useRef, useState } from "react";
import { taskStatusOptions } from "../../constants";

const EditStatusOption = ({
  id = null,
  isFromMultiSelect = false,
  setStatus,
  closeModal = () => {},
}) => {
  const modalRef = useRef(null);

  const checkClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setTimeout(() => closeModal(), 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkClickOutside);
    };
  }, []);

  const { updateTasks } = useTask();
  const [isBold, setIsBold] = useState("");

  const handleStatusClick = (status) => {
    if (id !== null || isFromMultiSelect) {
      updateTasks({ status }, id);
    } else {
      setStatus(status);
      setIsBold(status);
    }
  };

  return (
    <div ref={modalRef} className="ChangeStatusOption_box">
      {taskStatusOptions.map((status, index) => {
        return (
          <p
            key={index}
            value={status}
            onClick={() => handleStatusClick(status)}
            style={{ fontWeight: isBold === status ? "bold" : "" }}>
            {status}
          </p>
        );
      })}
    </div>
  );
};

export default EditStatusOption;

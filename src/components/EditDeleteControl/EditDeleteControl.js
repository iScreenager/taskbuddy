import React, { useEffect, useRef } from "react";
import Edit_icon from "../../assets/Edit_icon.png";
import Delete_icon from "../../assets/Delete_icon.png";
import "./EditDeleteControl.css";
import { useTask } from "../../hooks/useTask";
import { useIsMobile } from "../../hooks/useIsMobile";

const EditDeleteControl = (props) => {
  const { isMobile } = useIsMobile();
  const { deleteTasks, editTask } = useTask();

  const modalRef = useRef(null);

  const checkClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setTimeout(() => props.closeModal && props.closeModal(), 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", checkClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={
        !isMobile
          ? "editDelete_Options"
          : "mobile_view_editDelete_Options editDelete_Options"
      }>
      <div
        className="edit_option"
        onClick={(e) => {
          e.stopPropagation();
          editTask(props.taskData);
        }}>
        <img src={Edit_icon} alt="Edit task icon" draggable="false" />
        <p>Edit</p>
      </div>
      <div
        className="delete_option"
        onClick={() => deleteTasks(props.taskData.id)}>
        <img src={Delete_icon} alt="Delete task icon" draggable="false" />
        <p>Delete</p>
      </div>
    </div>
  );
};

export default EditDeleteControl;

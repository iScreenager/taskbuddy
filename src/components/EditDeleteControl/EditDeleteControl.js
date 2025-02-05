import React, { useEffect, useRef } from "react";
import Edit_icon from "../../assets/Edit_icon.png";
import Delete_icon from "../../assets/Delete_icon.png";
import "./EditDeleteControl.css";
import { useTask } from "../../hooks/useTask";

const EditDeleteControl = (props) => {
  const { deleteTasks, editTask } = useTask();

  const modalRef = useRef(null);

  const checkClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      props.closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className="editDelete_Options">
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

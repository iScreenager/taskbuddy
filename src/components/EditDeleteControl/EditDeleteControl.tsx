import React, { useEffect, useRef } from "react";
import Edit_icon from "../../assets/Edit_icon.png";
import Delete_icon from "../../assets/Delete_icon.png";
import "./EditDeleteControl.css";
import { useTask } from "../../hooks/useTask";
import { useIsMobile } from "../../hooks/useIsMobile";
import { TaskObjType } from "../../interface";

interface EditDeleteControlProps {
  taskData: TaskObjType;
  closeModal: () => void;
}
const EditDeleteControl = ({
  taskData,
  closeModal,
}: EditDeleteControlProps) => {
  const { isMobile } = useIsMobile();
  const { deleteTasks, editTask } = useTask();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const checkClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setTimeout(() => closeModal(), 100);
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
          editTask(taskData);
        }}>
        <img src={Edit_icon} alt="Edit task icon" draggable="false" />
        <p>Edit</p>
      </div>
      <div className="delete_option" onClick={() => deleteTasks(taskData.id)}>
        <img src={Delete_icon} alt="Delete task icon" draggable="false" />
        <p>Delete</p>
      </div>
    </div>
  );
};

export default EditDeleteControl;

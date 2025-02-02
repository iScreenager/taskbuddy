import React from "react";
import Edit_icon from "../../assets/Edit_icon.png";
import Delete_icon from "../../assets/Delete_icon.png";
import "./EditDeleteControl.css";
import { useTask } from "../../hooks/useTask";

const EditDeleteControl = (props) => {
  const { deleteTasks, editTask } = useTask();
  return (
    <div className="editDelete_Options">
      <div className="edit_option" onClick={() => editTask(props.taskData)}>
        <img src={Edit_icon} alt="Edit task icon"></img>
        <p>Edit</p>
      </div>
      <div
        className="delete_option"
        onClick={() => deleteTasks(props.taskData.id)}>
        <img src={Delete_icon} alt="Delete task icon"></img>
        <p>Delete</p>
      </div>
    </div>
  );
};

export default EditDeleteControl;

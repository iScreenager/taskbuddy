import React from "react";
import Edit_icon from "../../assets/Edit_icon.png";
import Delete_icon from "../../assets/Delete_icon.png";
import "./EditDeleteControl.css";

const EditDeleteControl = (props) => {
  return (
    <div className="editDelete_Options">
      <div className="edit_option" onClick={props.editTask}>
        <img src={Edit_icon} alt="Edit task icon"></img>
        <p>Edit</p>
      </div>
      <div className="delete_option" onClick={props.deleteTask}>
        <img src={Delete_icon} alt="Delete task icon"></img>
        <p>Delete</p>
      </div>
    </div>
  );
};

export default EditDeleteControl;

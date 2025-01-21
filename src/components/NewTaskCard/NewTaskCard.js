import "./NewTaskCard.css";
import { useState } from "react";
import DragDrop_icon from "../../assets/dragNdrop.png";
import Edit_Delete_icon from "../../assets/Edit_Delete_icon.png";
import circle_checkBox from "../../assets/circle_checkBox.png";
import EditDeleteControl from "../EditDeleteControl/EditDeleteControl.js";

const NewTaskCard = (props) => {
  const { taskName, dueDate, status, category, id } = props?.taskData;
  const { setSelectedTaskId, deleteTask, showEditModal } = props;

  // const [isShowModifyOptions, setIsShowModifyOptions] = useState(false);

  return (
    <div className="task_card">
      <div className="first_task_box">
        <div className="addTask card">
          <input type="checkbox" className="square-checkbox" />
          <img src={DragDrop_icon} className="drag_handler" alt="Icon" />
          <img src={circle_checkBox} className="circle-checkbox" alt="Icon" />
          <p className="task-name">{taskName}</p>
        </div>
        <div className="duedate card">{dueDate}</div>
        <div className="taskStatus card">
          <p>{status}</p>
        </div>
        <div className="taskCategory card">{category}</div>
      </div>
      <div
        className="modify_task_btn card"
        onClick={() => setSelectedTaskId(id)}>
        <img src={Edit_Delete_icon} alt="option icon"></img>
      </div>
      {showEditModal && <EditDeleteControl deleteTask={() => deleteTask(id)} />}
    </div>
  );
};

export default NewTaskCard;

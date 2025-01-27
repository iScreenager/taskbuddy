import "./NewTaskCard.css";
import { useState, useEffect } from "react";
import DragDrop_icon from "../../assets/dragNdrop.png";
import Edit_Delete_icon from "../../assets/Edit_Delete_icon.png";
import circle_checkBox from "../../assets/circle_checkBox.png";
import EditDeleteControl from "../EditDeleteControl/EditDeleteControl.js";
import Green_circle_checkBox from "../../assets/Green_circle_checkBox.png";
import EditStatusOption from "../EditStatusOption/EditStatusOption.js";

const NewTaskCard = (props) => {
  const { taskName, dueDate, status, category, id } = props?.taskData;
  const {
    setSelectedTaskId,
    deleteTask,
    showEditModal,
    checkedTaskId,
    storeCheckedId,
    editTask,
    setSelectedStatusTaskId,
    showEditStatusModal,
  } = props;

  // useEffect(() => {
  //   console.log("Updated storeCheckedId:", storeCheckedId);
  // }, [storeCheckedId]);

  // const [isShowModifyOptions, setIsShowModifyOptions] = useState(false);

  return (
    <div className="task_card">
      <div className="first_task_box">
        <div className="addTask card">
          <input
            type="checkbox"
            checked={storeCheckedId.includes(id)}
            className="square-checkbox"
            onClick={() => {
              checkedTaskId(id);
            }}
          />
          <img src={DragDrop_icon} className="drag_handler" alt="Icon" />
          <img
            src={
              status === "Completed" ? Green_circle_checkBox : circle_checkBox
            }
            className="circle-checkbox"
            alt="Icon"
          />

          <p className="task-name">
            {status === "Completed" ? <s>{taskName}</s> : taskName}
          </p>
        </div>
        <div className="duedate card">{dueDate}</div>
        <div
          className="taskStatus card"
          onClick={() => setSelectedStatusTaskId(id)}>
          <p>{status}</p>
          {showEditStatusModal && <EditStatusOption id={id} />}
        </div>
        <div className="taskCategory card">{category}</div>
      </div>
      <div
        className="modify_task_btn card"
        onClick={() => setSelectedTaskId(id)}>
        <img src={Edit_Delete_icon} alt="option icon"></img>
      </div>
      {showEditModal && (
        <EditDeleteControl
          editTask={() => editTask(props.taskData)}
          deleteTask={() => deleteTask(id)}
        />
      )}
    </div>
  );
};

export default NewTaskCard;

import "./NewTaskCard.css";
import { useContext } from "react";
import DragDrop_icon from "../../assets/dragNdrop.png";
import Edit_Delete_icon from "../../assets/Edit_Delete_icon.png";
import circle_checkBox from "../../assets/circle_checkBox.png";
import EditDeleteControl from "../EditDeleteControl/EditDeleteControl.js";
import Green_circle_checkBox from "../../assets/Green_circle_checkBox.png";
import EditStatusOption from "../EditStatusOption/EditStatusOption.js";
import { useTask } from "../../hooks/useTask.js";
import { TaskContext } from "../../context/TaskContext.js";
import { useIsMobile } from "../../hooks/useIsMobile.js";

const NewTaskCard = (props) => {
  const { isMobile } = useIsMobile();
  const { deleteTasks, editTask } = useTask();
  const { setStoreCheckedId, storeCheckedId } = useContext(TaskContext);
  const { taskName, dueDate, status, category, id } = props?.taskData;
  const {
    setSelectedTaskId,
    showEditModal,
    setSelectedStatusTaskId,
    showEditStatusModal,
  } = props;
  const handleCheckBoxClick = (taskId) => {
    if (storeCheckedId.includes(taskId)) {
      const newCheckedId = storeCheckedId.filter((id) => id !== taskId);
      setStoreCheckedId([...newCheckedId]);
    } else {
      setStoreCheckedId([...storeCheckedId, taskId]);
    }
  };
  return (
    <div className="task_card">
      <div className="first_task_box">
        <div
          className={
            !isMobile ? "addTask card" : "moblie-view-addTask addTask card"
          }>
          <input
            type="checkbox"
            checked={storeCheckedId.includes(id)}
            className="square-checkbox"
            onClick={() => handleCheckBoxClick(id)}
          />
          {!isMobile && (
            <img src={DragDrop_icon} className="drag_handler" alt="Icon" />
          )}
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
        {!isMobile && (
          <>
            <div className="duedate card">{dueDate}</div>
            <div
              className="taskStatus card"
              onClick={() => setSelectedStatusTaskId(id)}>
              <p className="taskStatus_option">{status}</p>
              {showEditStatusModal && <EditStatusOption id={id} />}
            </div>

            <div className="taskCategory card">{category}</div>
          </>
        )}
      </div>

      <div
        className="modify_task_btn card"
        onClick={() => setSelectedTaskId(id)}>
        <img src={Edit_Delete_icon} alt="option icon"></img>
      </div>

      {showEditModal && (
        <EditDeleteControl
          editTask={() => editTask(props.taskData)}
          deleteTask={() => deleteTasks(id)}
        />
      )}
    </div>
  );
};

export default NewTaskCard;

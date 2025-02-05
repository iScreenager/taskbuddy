import "./NewTaskCard.css";
import { useContext, useState } from "react";
import DragDrop_icon from "../../../../assets/dragNdrop.png";
import Edit_Delete_icon from "../../../../assets/Edit_Delete_icon.png";
import circle_checkBox from "../../../../assets/circle_checkBox.png";
import Green_circle_checkBox from "../../../../assets/Green_circle_checkBox.png";
import { useIsMobile } from "../../../../hooks/useIsMobile.js";
import { TaskContext } from "../../../../context/TaskContext.js";
import EditStatusOption from "../../../EditStatusOption/EditStatusOption.js";
import EditDeleteControl from "../../../EditDeleteControl/EditDeleteControl.js";
import { useDragAndDrop } from "../../../../hooks/useDragAndDrop.js";

const NewTaskCard = (props) => {
  const { isMobile } = useIsMobile();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const { setStoreCheckedId, storeCheckedId } = useContext(TaskContext);
  const { handleDragStart, handleDragEnd } = useDragAndDrop();

  const { taskName, dueDate, status, category, id } = props?.taskData;
  const handleCheckBoxClick = (taskId) => {
    if (storeCheckedId.includes(taskId)) {
      const newCheckedId = storeCheckedId.filter((id) => id !== taskId);
      setStoreCheckedId([...newCheckedId]);
    } else {
      setStoreCheckedId([...storeCheckedId, taskId]);
    }
  };

  return (
    <div
      className="task_card"
      onDragStart={(e) => handleDragStart(e, id, status)}
      onDragEnd={handleDragEnd}
      draggable>
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
            draggable="false"
          />

          <p className="task-name">
            {status === "Completed" ? <s>{taskName}</s> : taskName}
          </p>
        </div>
        {!isMobile && (
          <>
            <div className="duedate card">{dueDate}</div>
            <div className="taskStatus card">
              <p
                onClick={() => setShowEditStatusModal(!showEditStatusModal)}
                className="taskStatus_option">
                {status}
              </p>
              {showEditStatusModal && (
                <EditStatusOption
                  closeModal={() => setShowEditStatusModal(false)}
                  id={id}
                />
              )}
            </div>

            <div className="taskCategory card">{category}</div>
          </>
        )}
      </div>

      <div
        className="modify_task_btn card"
        onClick={(e) => {
          setShowEditModal(true);
        }}>
        <img src={Edit_Delete_icon} alt="option icon" draggable="false"></img>
      </div>

      {showEditModal && (
        <EditDeleteControl
          closeModal={() => setShowEditModal(false)}
          taskData={props.taskData}
        />
      )}
    </div>
  );
};

export default NewTaskCard;

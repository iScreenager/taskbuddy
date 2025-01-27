import "./TaskCard.css";
import dropDown_up_icons from "../../assets/dropDown_up_icons.png";
import NewTaskCard from "../NewTaskCard/NewTaskCard";
import addTask_icon from "../../assets/addTask_icon.png";

import { useState } from "react";




const TaskCard = (props) => {
  const cardClassName = props.cardName
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-");
  const {
    cardName,
    tasks,
    openModal,
    setSelectedTaskCard,
    showEditDeleteModal,
    setIsShowMultiSelectModal,
    storeCheckedId,
    editTask,
  } = props;

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedStatusTaskId, setSelectedStatusTaskId] = useState(null);

  const handleShowEditModal = (taskId) => {
    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
    } else {
      setSelectedTaskId(taskId);
    }
  };
  const handleModalShow = (id) => {
    handleShowEditModal(id);
    setSelectedTaskCard(cardName);
  };
  const handleShowEditStatusModal = (id) => {
    if (selectedStatusTaskId === id) {
      setSelectedStatusTaskId(null);
    } else {
      setSelectedStatusTaskId(id);
    }
    setSelectedTaskCard(cardName);
  };

  return (
    <div className="task_card_body">
      <div className={`title_container ${cardClassName}`}>
        <p>
          {cardName} {`(${tasks.length})`}
        </p>
        <img src={dropDown_up_icons}></img>
      </div>
      <div className="task_body">
        {props.cardName.toLowerCase() === "todo" && (
          <div className="add_task_btn " onClick={openModal}>
            <img src={addTask_icon} alt="Add Task icon"></img>
            <p>ADD TASK</p>
          </div>
        )}
        {tasks.length === 0 ? (
          <div
            style={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <p>No Tasks in {cardName}</p>
          </div>
        ) : (
          <div className="task_container">
            {tasks.map((task, _) => (
              <NewTaskCard
                key={task.id}
                taskData={task}
                deleteTask={props.deleteTask}
                showEditModal={
                  showEditDeleteModal && task.id === selectedTaskId
                }
                setSelectedTaskId={(id) => handleModalShow(id)}
                checkedTaskId={(id) => setIsShowMultiSelectModal(id)}
                storeCheckedId={storeCheckedId}
                editTask={(taskData) => editTask(taskData)}
                setSelectedStatusTaskId={(id) => handleShowEditStatusModal(id)}
                showEditStatusModal={
                  showEditDeleteModal && task.id === selectedStatusTaskId
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskCard;

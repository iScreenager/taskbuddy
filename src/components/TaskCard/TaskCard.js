import "./TaskCard.css";
import dropDown_up_icons from "../../assets/dropDown_up_icons.png";
import NewTaskCard from "../NewTaskCard/NewTaskCard";
import addTask_icon from "../../assets/addTask_icon.png";
import dropDown_down_icon from "../../assets/dropDown_down_icons.png";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useContext, useState } from "react";
import AddTask from "../AddTask/AddTask";
import { TaskContext } from "../../context/TaskContext";

const TaskCard = (props) => {
  const { isMobile } = useIsMobile();
  const cardClassName = props.cardName.toLowerCase().replace(/\s+/g, "-");
  const {
    cardName,
    tasks,
    setSelectedTaskCard,
    showEditDeleteModal,
    isOpen,
    setIsOpen,
  } = props;

  const { handleDrop, handleDragOver } = useDragAndDrop();

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedStatusTaskId, setSelectedStatusTaskId] = useState(null);
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
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
    <div
      className="task_card_body"
      onDrop={(e) => handleDrop(e, cardName)}
      onDragOver={(e) => handleDragOver(e)}
      draggable>
      <div className={`title_container ${cardClassName}`}>
        <p>
          {cardName} {`(${tasks.length})`}
        </p>
        {isOpen ? (
          <img
            style={{ cursor: "pointer" }}
            src={dropDown_up_icons}
            onClick={() => setIsOpen(cardName)}
            alt="drop down icon"
            draggable="false"></img>
        ) : (
          <img
            style={{ cursor: "pointer" }}
            src={dropDown_down_icon}
            onClick={() => setIsOpen(cardName)}
            alt="drop down icon"
            draggable="false"></img>
        )}
      </div>
      {isOpen && (
        <div className="task_body">
          {!isMobile && props.cardName.toLowerCase() === "todo" && (
            <div
              className="add_task_btn "
              onClick={() => setIsOpenAddTask(!isOpenAddTask)}>
              <img
                src={addTask_icon}
                alt="Add Task icon"
                draggable="false"></img>
              <p>ADD TASK</p>
            </div>
          )}
          {!isMobile &&
            props.cardName.toLowerCase() === "todo" &&
            isOpenAddTask && (
              <AddTask
                setIsOpenAddTask={setIsOpenAddTask}
                isOpenAddTask={isOpenAddTask}
              />
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
              {tasks.map((task, _) => {
                return (
                  <NewTaskCard
                    key={task.id}
                    taskData={task}
                    showEditModal={
                      showEditDeleteModal && task.id === selectedTaskId
                    }
                    showEditStatusModal={
                      showEditDeleteModal && task.id === selectedStatusTaskId
                    }
                    setSelectedTaskId={(id) => handleModalShow(id)}
                    setSelectedStatusTaskId={(id) =>
                      handleShowEditStatusModal(id)
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default TaskCard;

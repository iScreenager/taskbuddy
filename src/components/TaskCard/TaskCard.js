import "./TaskCard.css";
import dropDown_up_icons from "../../assets/dropDown_up_icons.png";
import NewTaskCard from "../NewTaskCard/NewTaskCard";
import addTask_icon from "../../assets/addTask_icon.png";

import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

const TaskCard = (props) => {
  const { isMobile } = useIsMobile();
  const cardClassName = props.cardName
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-");
  const {
    cardName,
    tasks,
    setSelectedTaskCard,
    showEditDeleteModal,
    isOpen,
    setIsOpen,
  } = props;

  const [filteredData, setFilteredData] = useState([]);

  const { filteredCategory, filteredDate, searchField } =
    useContext(TaskContext);
  const { handleDrop, handleDragOver } = useDragAndDrop();

  useEffect(() => {
    let filtered = tasks;
    if (filteredCategory) {
      filtered = filtered.filter((task) => task.category === filteredCategory);
    }
    if (filteredDate) {
      const formattedDate = getFormattedDate(filteredDate);
      filtered = filtered.filter((task) => task.dueDate === formattedDate);
    }
    if (searchField) {
      filtered = filtered.filter((task) =>
        task.taskName.toLowerCase().includes(searchField.toLowerCase())
      );
    }
    setFilteredData([...filtered]);
  }, [filteredCategory, filteredDate, searchField, tasks]);

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
    <div
      className="task_card_body"
      onDrop={(e) => handleDrop(e, cardName)}
      onDragOver={(e) => handleDragOver(e)}
      draggable>
      <div className={`title_container ${cardClassName}`}>
        <p>
          {cardName} {`(${filteredData.length})`}
        </p>
        <img
          src={dropDown_up_icons}
          onClick={() => setIsOpen(cardName)}
          alt="drop down icon"></img>
      </div>
      {isOpen && (
        <div className="task_body">
          {!isMobile && props.cardName.toLowerCase() === "todo" && (
            <div className="add_task_btn ">
              <img src={addTask_icon} alt="Add Task icon"></img>
              <p>ADD TASK</p>
            </div>
          )}

          {filteredData.length === 0 ? (
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
              {filteredData.map((task, _) => {
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

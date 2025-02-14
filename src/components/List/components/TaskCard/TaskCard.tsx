import "./TaskCard.css";
import dropDown_up_icons from "../../../../assets/dropDown_up_icons.png";
import NewTaskCard from "../NewTaskCard/NewTaskCard";
import addTask_icon from "../../../../assets/addTask_icon.png";
import dropDown_down_icon from "../../../../assets/dropDown_down_icons.png";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { useDragAndDrop } from "../../../../hooks/useDragAndDrop";
import { useState } from "react";
import AddTask from "../AddTask/AddTask";
import { TaskObjType, TaskStatusOption } from "../../../../interface";

interface TaskCardProps {
  cardName: TaskStatusOption;
  tasks: TaskObjType[];
  isExpanded: boolean;
  setIsExpanded: (cardName: TaskStatusOption) => void;
}

const TaskCard = ({
  cardName,
  tasks,
  isExpanded,
  setIsExpanded,
}: TaskCardProps) => {
  const { isMobile } = useIsMobile();

  const cardClassName = cardName.toLowerCase().replace(/\s+/g, "-");

  const { handleDrop, handleDragOver } = useDragAndDrop();
  const [isOpenAddTask, setIsOpenAddTask] = useState<boolean>(false);

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
        {isExpanded ? (
          <img
            style={{ cursor: "pointer" }}
            src={dropDown_up_icons}
            onClick={() => setIsExpanded(cardName)}
            alt="drop down icon"
            draggable="false"></img>
        ) : (
          <img
            style={{ cursor: "pointer" }}
            src={dropDown_down_icon}
            onClick={() => setIsExpanded(cardName)}
            alt="drop down icon"
            draggable="false"></img>
        )}
      </div>
      {isExpanded && (
        <div className="task_body">
          {!isMobile && cardName.toLowerCase() === "todo" && (
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
          {!isMobile && cardName.toLowerCase() === "todo" && isOpenAddTask && (
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
                return <NewTaskCard key={task.id} taskData={task} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default TaskCard;

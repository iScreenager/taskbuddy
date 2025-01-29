import { useState } from "react";
import sort from "../../assets/Sort.png";
import "./TaskHeading.css";
import { useTask } from "../../hooks/useTask";

const TaskHeading = (props) => {
  const { sortTaskData } = useTask();
  return (
    <div className="task_heading">
      <div className="task_name">Task name</div>
      <div className="due_date" onClick={() => sortTaskData()}>
        Due on<img src={sort}></img>
      </div>
      <div className="task_status">Task Status</div>
      <div className="task_category">Task Category</div>
    </div>
  );
};

export default TaskHeading;

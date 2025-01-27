import { useState } from "react";
import sort from "../../assets/Sort.png";
import "./TaskHeading.css";


const TaskHeading = (props) => {
 
  return (
    <div className="task_heading">
      <div className="task_name">Task name</div>
      <div className="due_date" onClick={props.sortData}>
        Due on<img src={sort}></img>
      </div>
      <div className="task_status">Task Status</div>
      <div className="task_category">Task Category</div>
    </div>
  );
};

export default TaskHeading;

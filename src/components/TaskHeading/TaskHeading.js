import { useContext, useState } from "react";
import sort from "../../assets/Sort.png";
import "./TaskHeading.css";
import { getSortedData } from "../../utils/getSortedData";
import { TaskContext } from "../../context/TaskContext";

const TaskHeading = () => {
  const { taskData, setTaskData } = useContext(TaskContext);
  const [isAsc, setIsAsc] = useState(true);
  const sortData = () => {
    const sortedData = getSortedData(taskData, isAsc);
    setTaskData([...sortedData]);
    setIsAsc(!isAsc);
  };
  return (
    <div className="task_heading">
      <div className="task_name">Task name</div>
      <div className="due_date" onClick={() => sortData()}>
        Due on<img src={sort}></img>
      </div>
      <div className="task_status">Task Status</div>
      <div className="task_category">Task Category</div>
    </div>
  );
};

export default TaskHeading;

import "./AddTask.css";
import Union from "../../../../assets/Union.png";
import DatePicker from "react-datepicker";
import Calendar from "../../../../assets/Calender.png";
import { useEffect, useRef, useState } from "react";
import { getFormattedDate } from "../../../../utils/getFormattedDate";
import EditStatusOption from "../../../EditStatusOption/EditStatusOption";
import Category from "../../../Header/components/Category/Category";
import { useTask } from "../../../../hooks/useTask";
import { TaskObjType, TaskStatusOption } from "../../../../interface";

interface AddTaskProps {
  setIsOpenAddTask: (isOpen: boolean) => void;
  isOpenAddTask: boolean;
}

const AddTask = ({ setIsOpenAddTask, isOpenAddTask }: AddTaskProps) => {
  const datePickerRef = useRef<DatePicker | null>(null);
  const { addTask } = useTask();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [taskName, setTaskName] = useState<string>("Task Title");
  const [status, setStatus] = useState<TaskStatusOption>(
    TaskStatusOption.NOSTATUS
  );
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    setFormattedDate(getFormattedDate(currentDate));
  }, [currentDate]);

  const addNewTask = () => {
    if (
      !taskName ||
      taskName === "Task Title" ||
      !currentDate ||
      !status ||
      !category
    ) {
      return;
    }

    const taskObj: TaskObjType = {
      taskName: taskName,
      dueDate: formattedDate,
      status: status,
      category: category,
    };
    addTask(taskObj);
    setIsOpenAddTask(false);
  };
  return (
    <div className="add_task_card" draggable="false">
      <div className="add_Task_btn">
        <input
          type="text"
          placeholder={taskName}
          className="title_holder"
          onChange={(e) => setTaskName(e.target.value)}></input>
        <div className="add_btn">
          <button className="add-btn-task" onClick={addNewTask}>
            ADD
            <img src={Union} style={{ width: "12px", height: "12px" }}></img>
          </button>
          <button
            className="cancel_task_btn"
            onClick={() => setIsOpenAddTask(false)}>
            CANCEL
          </button>
        </div>
      </div>
      <div className="add_due_date" style={{ position: "relative" }}>
        <DatePicker
          ref={datePickerRef}
          selected={currentDate}
          dateFormat="dd / MM / yyyy"
          onChange={(currentDate: Date | null) => setCurrentDate(currentDate)}
          placeholderText="Add task"
          className="filter_dropDown due-Date"
          popperPlacement="bottom-start"
          portalId="root"
        />

        <img
          src={Calendar}
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            left: "10px",
            top: "8px",
            cursor: "pointer",
          }}
          alt="calender icon"
          className="calendar_icon"
          draggable="false"
          onClick={() => datePickerRef.current?.setFocus()}
        />
      </div>
      <div className="status">
        <div className="cirle">
          <p>+</p>
        </div>
        <div
          style={{
            position: "absolute",
            left: "40px",
          }}>
          <EditStatusOption
            setStatus={setStatus}
            closeModal={() => console.log("Modal closed")}
          />
        </div>
      </div>
      <div className="catgeroy">
        <div className="cirle">
          <p>+</p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "-25px",
            left: "-20px",
          }}>
          <Category
            setCategory={(category) => setCategory(category)}
            isOpenAddTask={isOpenAddTask}
            closeModal={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default AddTask;

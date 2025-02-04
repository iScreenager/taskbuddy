import "./AddTaskModal.css";
import close from "../../assets/close_icon.png";
import Descriptions from "../../assets/Descriptions.png";
import number_points from "../../assets/number_points.png";
import bullet_ponits from "../../assets/bullet_points.png";
import React, { useContext, useState } from "react";
import Warning from "../Warning/Warning";
import { useTask } from "../../hooks/useTask";
import Loader from "../Loader/Loader";
import { TaskContext } from "../../context/TaskContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getFormattedDate } from "../../utils/getFormattedDate";

const AddTaskModal = () => {
  const { addTask, updateTasks } = useTask();
  const { isMobile } = useIsMobile();
  const {
    setAddModalData,
    setShowAddModal,
    addModalData: data,
    isLoading,
  } = useContext(TaskContext);

  const [count, setCount] = useState(0);
  const [isBold, setIsBold] = useState(false);
  const [taskName, setTaskName] = useState(data?.taskName ?? "");
  const [currentCategory, setCurrentCategory] = useState(data?.category ?? "");
  const [currentDate, setCurrentDate] = useState(data?.dueDate ?? new Date());
  const [currentStatus, setCurrentStatus] = useState(data?.status ?? "");
  const [showWarning, setShowWarning] = useState("");
  const [description, setDescription] = useState(data?.description ?? "");
  const [uploadFile, setUploadFile] = useState(null);

  const selectCategory = (category) => {
    setCurrentCategory(category);
  };

  const selectDate = (date) => {
    const formattedDate = getFormattedDate(date);
    setCurrentDate(formattedDate);
  };
  const selectTaskStatus = (e) => {
    setCurrentStatus(e.target.value);
  };
  const selectDescription = (e) => {
    setCount(e.target.value.length);
    setDescription(e.target.value);
  };
  const selectUploadFile = (e) => {
    setUploadFile(e.target.files[0]);
  };

  function handelResult() {
    if (!taskName) {
      setShowWarning("Please give the Task Name");
      return;
    }

    if (!currentCategory) {
      setShowWarning("Please select a Task Category.");
      return;
    }

    if (!currentDate) {
      setShowWarning("Please select a Due Date.");
      return;
    }

    if (!currentStatus) {
      setShowWarning("Please select a Task Status.");
      return;
    }

    const taskObj = {
      taskName: taskName,
      description: description,
      dueDate: currentDate,
      status: currentStatus,
      category: currentCategory,
      uploadFile: uploadFile,
    };

    data ? updateTasks(taskObj, data.id) : addTask(taskObj);
  }

  const closeModal = () => {
    setAddModalData(null);
    setShowAddModal(false);
  };

  return (
    <div
      className={
        !isMobile ? "task_modal" : "mobile_view_task_modal task_modal"
      }>
      <div
        className={
          !isMobile
            ? "createTaskModal_container"
            : "moblie_view_createTaskModal_container createTaskModal_container"
        }>
        <div
          className={
            !isMobile
              ? "createTaskModal_heading"
              : "moblie_view_createTaskModal_heading createTaskModal_heading"
          }>
          <p>{data ? "Edit Task" : "Create Task"}</p>
          <img src={close} alt="close_icons" onClick={closeModal}></img>
        </div>
        <div className="divider" />
        <div className="createTaskModal_body">
          <input
            type="text"
            placeholder="Task title"
            className="taskTile"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <div className="description_container">
            <div className="description_input_container">
              <img src={Descriptions} alt="Description Icon" />
              <textarea
                placeholder="Description"
                maxLength="300"
                rows="6"
                value={description}
                onChange={selectDescription}
                style={{ fontWeight: isBold ? "bold" : "normal" }}></textarea>
            </div>
            <div className="description_style_container">
              <div className="description_style_icons">
                <p
                  className={isBold ? "make_bold" : ""}
                  onClick={() => setIsBold(!isBold)}>
                  B
                </p>
                <p className="description_italic" onClick>
                  /
                </p>
                <p className="description_cut">Ꞩ</p>
                <p className="description_divider">|</p>
                <img
                  src={number_points}
                  className="description_numPoint"
                  alt="Number Points"
                />
                <img
                  src={bullet_ponits}
                  className="description_bulletPoint"
                  alt="Bullet Points"
                />
              </div>
              <span className="description_letters_count">
                {count}/300 characters
              </span>
            </div>
          </div>

          <div
            className={
              !isMobile ? "task_type" : "mobile_view_task_type task_type"
            }>
            <div className="taskCategory_box">
              <p>
                Task Category<sup>*</sup>
              </p>
              <div className="taskCategory_btn">
                <button
                  className={
                    currentCategory === "Work"
                      ? "work_btn btn btn_color"
                      : "work_btn btn"
                  }
                  onClick={() => {
                    selectCategory("Work");
                  }}>
                  Work
                </button>
                <button
                  className={
                    currentCategory === "Personal"
                      ? "personal_btn btn btn_color"
                      : "personal_btn btn"
                  }
                  onClick={() => selectCategory("Personal")}>
                  Personal
                </button>
              </div>
            </div>

            <div className="taskDueDate">
              <p required>
                Due on<sup>*</sup>
              </p>

              <DatePicker
                selected={currentDate}
                dateFormat="dd / MM / yyyy"
                onChange={(currentDate) => selectDate(currentDate)}
                placeholderText="DD / MM / YY"
                showIcon
                calendarIconClassName="calendarIcon-add"
              />
            </div>
            <div className="taskStatu">
              <p>
                Task Status<sup>*</sup>
              </p>
              <select
                id="options"
                name="options"
                value={currentStatus}
                onChange={selectTaskStatus}
                required>
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="Todo">ToDo</option>
                <option value="InProgress">In-progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="createTaskModal_footer">
          <button onClick={closeModal} className="cancel_btn">
            CANCEL
          </button>
          <button className="create_btn" onClick={handelResult}>
            {data ? "UPDATE" : "CREATE"}
          </button>
        </div>
        {showWarning && (
          <Warning
            message={showWarning}
            onClose={() => setShowWarning(false)}
          />
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};
export default AddTaskModal;

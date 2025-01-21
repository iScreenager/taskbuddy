import "./AddTaskModal.css";
import close from "../../assets/close_icon.png";
import Descriptions from "../../assets/Descriptions.png";
import number_points from "../../assets/number_points.png";
import bullet_ponits from "../../assets/bullet_points.png";
import React, { useState } from "react";
import Warning from "../Warning/Warning";

const AddTaskModal = (props) => {
  const [count, setCount] = useState(0);
  const [isBold, setIsBold] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [showWarning, setShowWarning] = useState("");
  const [description, setDescription] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

  const selectCategory = (category) => {
    setCurrentCategory(category);
  };
  const selectDate = (e) => {
    setCurrentDate(e.target.value);
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

    props.addTask(taskObj);

    // props.closeModal(false);
  }

  return (
    <div className="task_modal">
      <div className="createTaskModal_container">
        <div className="createTaskModal_heading">
          <p>Create Task</p>
          <img src={close} alt="close_icons" onClick={props.closeModal}></img>
        </div>
        <hr className="divider" />
        <div className="createTaskModal_body">
          <input
            type="text"
            placeholder="Task title"
            className="taskTile"
            onChange={(e) => setTaskName(e.target.value)}
          />

          <div className="description_container">
            <div className="description_input_container">
              <img src={Descriptions} alt="Description Icon" />
              <textarea
                placeholder="Description"
                maxLength="300"
                rows="6"
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

          <div className="task_type">
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
              <input
                type="date"
                className="task_btn"
                onChange={selectDate}></input>
            </div>
            <div className="taskStatu">
              <p>
                Task Status<sup>*</sup>
              </p>
              <select
                id="options"
                name="options"
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
          <div className="attachment">
            <p>Attachment</p>
            <div id="dropzone" class="dropzone">
              <p>
                Drop your files here or{" "}
                <a href="#" class="update-link">
                  Update
                </a>
              </p>
            </div>
          </div>
          <div className="drop_file"></div>
        </div>

        <div className="createTaskModal_footer">
          <button className="cancel_btn">CANCEL</button>
          <button className="create_btn" onClick={handelResult}>
            CREATE
          </button>
        </div>
        {showWarning && (
          <Warning
            message={showWarning}
            onClose={() => setShowWarning(false)}
          />
        )}
      </div>
    </div>
  );
};
export default AddTaskModal;

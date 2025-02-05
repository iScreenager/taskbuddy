import select_icon from "../../assets/select_icon.png";
import white_close_icon from "../../assets/white_delete_icon.png";
import "./MultiSelectModal.css";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useTask } from "../../hooks/useTask";
import EditStatusOption from "../EditStatusOption/EditStatusOption";

const MultiSelectModal = () => {
  const { storeCheckedId, setStoreCheckedId, taskData } =
    useContext(TaskContext);
  const { deleteTasks } = useTask();
  const [showMultiSelectStatusModal, setShowMultiSelectStatusModal] =
    useState(false);

  const handleMultiChecked = () => {
    if (storeCheckedId.length !== taskData.length) {
      setStoreCheckedId(taskData.map((task) => task.id));
    } else {
      setStoreCheckedId([]);
    }
  };

  return (
    <div className="multiSelectModal_container">
      <div className="info_select_box">
        <div className="selected_task_count">
          <p>{storeCheckedId.length} Tasks Selected </p>
          <img
            src={white_close_icon}
            className="close_btn"
            onClick={() => setStoreCheckedId([])}
            alt="cross icons"
            draggable="false"></img>
        </div>
        <img
          src={select_icon}
          onClick={handleMultiChecked}
          draggable="false"
          alt="check box"
        />
      </div>
      <div className="multiSelect_btn">
        <button
          className="status_btn"
          onClick={() =>
            setShowMultiSelectStatusModal(!showMultiSelectStatusModal)
          }>
          Status
        </button>

        <button className="delete_btn" onClick={() => deleteTasks()}>
          Delete
        </button>
        {showMultiSelectStatusModal && (
          <div
            style={{
              position: "absolute",
              bottom: 90,
              right: -170,
              width: "670px",
            }}>
            <EditStatusOption
              closeModal={() => setShowMultiSelectStatusModal(false)}
              isFromMultiSelect={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectModal;

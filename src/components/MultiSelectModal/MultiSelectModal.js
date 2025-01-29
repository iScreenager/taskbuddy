import select_icon from "../../assets/select_icon.png";
import white_close_icon from "../../assets/white_delete_icon.png";
import "./MultiSelectModal.css";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useTask } from "../../hooks/useTask";
import EditStatusOption from "../EditStatusOption/EditStatusOption";

const MultiSelectModal = () => {
  const { storeCheckedId, setStoreCheckedId } = useContext(TaskContext);
  const { deleteTasks } = useTask();
  const [showMultiSelectStatusModal, setShowMultiSelectStatusModal] =
    useState(false);
  return (
    <div className="multiSelectModal_container">
      <div className="info_select_box">
        <div className="selected_task_count">
          <p>{storeCheckedId.length} Tasks Selected </p>
          <img
            src={white_close_icon}
            className="close_btn"
            onClick={() => setStoreCheckedId([])}
            alt="cross icons"></img>
        </div>
        <img src={select_icon}></img>
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
          <div style={{ position: "absolute", bottom: 90, right: 160 }}>
            <EditStatusOption isFromMultiSelect={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectModal;

import select_icon from "../../assets/select_icon.png";
import white_close_icon from "../../assets/white_delete_icon.png";
import "./MultiSelectModal.css";
import { db } from "../firebase";

const MultiSelectModal = ({
  checkedIds,
  deleteCheckedIds,
  setIsCloseMultiselectPopUp,
}) => {
  return (
    <div className="multiSelectModal_container">
      <div className="info_select_box">
        <div className="selected_task_count">
          <p>{checkedIds.length} Tasks Selected </p>
          <img
            src={white_close_icon}
            className="close_btn"
            onClick={() => setIsCloseMultiselectPopUp()}
            alt="cross icons"></img>
        </div>
        <img src={select_icon}></img>
      </div>
      <div className="multiSelect_btn">
        <button className="status_btn">Status</button>
        <button className="delete_btn" onClick={deleteCheckedIds}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MultiSelectModal;

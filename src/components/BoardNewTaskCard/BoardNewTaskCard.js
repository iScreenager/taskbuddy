import { useState } from "react";
import Edit_Delete_icon from "../../assets/Edit_Delete_icon.png";
import "./BoardNewTaskCard.css";
import EditDeleteControl from "../EditDeleteControl/EditDeleteControl";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

const BoardNewTaskCard = ({ task }) => {
  const [showEditModal, setShowEditModal] = useState();
  const { handleDragStart, handleDragEnd } = useDragAndDrop();
  const { taskName, dueDate, category, status, id } = task;
  return (
    <div
      className="board_task_card"
      onDragStart={(e) => handleDragStart(e, id, status)}
      onDragEnd={handleDragEnd}
      draggable>
      <div className="board_card_heading">
        <p>{taskName}</p>
        <img
          src={Edit_Delete_icon}
          onClick={() => setShowEditModal(!showEditModal)}
          alt="edit delete icon"
        />
        {showEditModal && (
          <div className="edit_modal">
            <EditDeleteControl taskData={task} />
          </div>
        )}
      </div>
      <div className="board_card_footer">
        <p>{category}</p>
        <p>{dueDate}</p>
      </div>
    </div>
  );
};
export default BoardNewTaskCard;

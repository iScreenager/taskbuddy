import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import BoardNewTaskCard from "../BoardNewTaskCard/BoardNewTaskCard";
import "./BoardCardBody.css";

const BoardCardBody = (props) => {
  const { cardName, tasks } = props;
  const { handleDrop, handleDragOver } = useDragAndDrop();
  const cardClassName = props.cardName.toLowerCase().replace(/\s+/g, "-");
  return (
    <div
      className="boardCardBody_box"
      onDrop={(e) => handleDrop(e, cardName)}
      onDragOver={(e) => handleDragOver(e)}
      draggable>
      <div className="board_cards_heading">
        <p className={`board_name ${cardClassName}`}>
          {cardName.toUpperCase()} ({tasks.length})
        </p>

        <div className="board_list">
          {tasks.length === 0 ? (
            <div
              style={{
                height: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              No task in {cardName}
            </div>
          ) : (
            tasks.map((task) => <BoardNewTaskCard task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardCardBody;

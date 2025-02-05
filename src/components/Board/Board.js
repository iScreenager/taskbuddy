import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import BoardCardBody from "./components/BoardCardBody/BoardCardBody";

const Board = () => {
  const { cardData } = useContext(TaskContext);
  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
        height: "83%",
        boxSizing: "border-box",
        padding: "10px 0px",
      }}>
      {cardData.map((card) => (
        <BoardCardBody
          key={card.cardName}
          cardName={card.cardName}
          tasks={card.tasks}
        />
      ))}
    </div>
  );
};

export default Board;

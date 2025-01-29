import React, { useContext, useState } from "react";
import TaskHeading from "../TaskHeading/TaskHeading";
import { useTask } from "../../hooks/useTask";
import TaskCard from "../TaskCard/TaskCard";
import "./List.css";
import { TaskContext } from "../../context/TaskContext";

const List = () => {
  const { cardData, setSelectedTaskCard, selectedTaskCard } =
    useContext(TaskContext);

  return (
    <div className="cardTask_coontainer">
      <TaskHeading />
      <div className="task_view">
        {cardData.map((card) => (
          <TaskCard
            key={card.cardName}
            cardName={card.cardName}
            tasks={card.tasks}
            setSelectedTaskCard={(cardName) => setSelectedTaskCard(cardName)} // Todo
            showEditDeleteModal={card.cardName === selectedTaskCard}    // Todo
          />
        ))}
      </div>
    </div>
  );
};

export default List;

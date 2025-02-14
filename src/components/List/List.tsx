import React, { useContext, useState } from "react";
import TaskCard from "./components/TaskCard/TaskCard";
import "./List.css";
import { TaskContext } from "../../context/TaskContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import TaskHeading from "./components/TaskHeading/TaskHeading";
import { taskStatusOptions } from "../../constants";

const List = () => {
  const { cardData } = useContext(TaskContext);

  const { isMobile } = useIsMobile();
  const [expandedTaskCards, setExpandedTaskCards] =
    useState<string[]>(taskStatusOptions);

  const handleOpenedTaskCards = (cardName: string) => {
    if (expandedTaskCards.includes(cardName)) {
      const openTask = expandedTaskCards.filter(
        (openedCardName) => openedCardName !== cardName
      );
      setExpandedTaskCards([...openTask]);
    } else {
      setExpandedTaskCards((prev) => [...prev, cardName]);
    }
  };

  return (
    <div className="cardTask_coontainer">
      {!isMobile && (
        <>
          <div className="underLine"></div>
          <TaskHeading />
        </>
      )}
      <div
        className="task_view"
        style={
          isMobile ? { marginTop: "10px", overscrollBehavior: "none" } : {}
        }>
        {cardData.map((card) => (
          <TaskCard
            key={card.cardName}
            cardName={card.cardName}
            tasks={card.tasks}
            isExpanded={expandedTaskCards.includes(card.cardName)}
            setIsExpanded={(cardName: string) =>
              handleOpenedTaskCards(cardName)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default List;

import { createContext, useState } from "react";

export const TaskContext = createContext({
  taskData: undefined,
  setTaskData: () => {},
  cardData: undefined,
  setCardData: [],
  showAddModal: undefined,
  setShowAddModal: () => {},
  addModalData: undefined,
  setAddModalData: () => {},
  selectedTaskCard: undefined,
  setSelectedTaskCard: () => {},
  storeCheckedId: [],
  setStoreCheckedId: undefined,
});

export const TaskProvider = ({ children }) => {
  const [taskData, setTaskData] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalData, setAddModalData] = useState(null);
  const [selectedTaskCard, setSelectedTaskCard] = useState("");
  const [storeCheckedId, setStoreCheckedId] = useState([]);
  return (
    <TaskContext.Provider
      value={{
        taskData,
        setTaskData,
        cardData,
        setCardData,
        showAddModal,
        setShowAddModal,
        addModalData,
        setAddModalData,
        selectedTaskCard,
        setSelectedTaskCard,
        storeCheckedId,
        setStoreCheckedId,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

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
  storeCheckedId: undefined,
  setStoreCheckedId: () => {},
  filteredCategory: undefined,
  setFilteredCategory: () => {},
  searchField: undefined,
  setSearchField: () => {},
  isLoading: undefined,
  setIsLoading: () => {},
  filteredDate: undefined,
  setFilteredDate: () => {},
  userData: undefined,
  setUserData: () => {},
});

export const TaskProvider = ({ children }) => {
  const [taskData, setTaskData] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalData, setAddModalData] = useState(null);
  const [selectedTaskCard, setSelectedTaskCard] = useState("");
  const [storeCheckedId, setStoreCheckedId] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredDate, setFilteredDate] = useState(null);
  const [searchField, setSearchField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

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
        filteredCategory,
        setFilteredCategory,
        filteredDate,
        setFilteredDate,
        searchField,
        setSearchField,
        isLoading,
        setIsLoading,
        userData,
        setUserData,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

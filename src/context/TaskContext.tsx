import { createContext, useState, ReactNode } from "react";
import { CardDataType, TaskObjType, UserData } from "../interface";

export interface TaskContextType {
  taskData: TaskObjType[];
  setTaskData: (data: TaskObjType[]) => void;
  cardData: CardDataType[];
  setCardData: (data: CardDataType[]) => void;
  showAddModal: boolean;
  setShowAddModal: (state: boolean) => void;
  addModalData: TaskObjType | null;
  setAddModalData: (data: TaskObjType | null) => void;
  storeCheckedId: string[];
  setStoreCheckedId: (ids: string[]) => void;
  filteredCategory: string | null;
  setFilteredCategory: (category: string | null) => void;
  searchField: string | null;
  setSearchField: (field: string | null) => void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  filteredDate: Date | null;
  setFilteredDate: (date: Date | null) => void;
  userData: UserData | null;
  setUserData: (result: UserData | null) => void;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (state: boolean) => void;
}

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType
);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [taskData, setTaskData] = useState<TaskObjType[]>([]);
  const [cardData, setCardData] = useState<CardDataType[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [addModalData, setAddModalData] = useState<TaskObjType | null>(null);
  const [storeCheckedId, setStoreCheckedId] = useState<string[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);
  const [searchField, setSearchField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);

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
        isCategoryModalOpen,
        setIsCategoryModalOpen,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

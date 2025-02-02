import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../components/firebase";
import { useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { getSortedData } from "../utils/getSortedData";
import { getFormattedDate } from "../utils/getFormattedDate";

export const useTask = ({ fetchOnLoad = false } = {}) => {
  const {
    taskData,
    setTaskData,
    setShowAddModal,
    setAddModalData,
    setCardData,
    setSelectedTaskCard,
    storeCheckedId,
    setStoreCheckedId,
    isLoading,
    setIsLoading,
    userData,
    filteredCategory,
    filteredDate,
    searchField,
  } = useContext(TaskContext);
  const addTask = async (taskObj) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "tasks", userData.uid, "userTasks"), taskObj);
      setShowAddModal(false);
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const getTasks = async () => {
    console.log("getTasks");
    try {
      const taskCollections = await getDocs(
        collection(db, "tasks", userData.uid, "userTasks")
      );
      const tasks = taskCollections.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedData = getSortedData(tasks, false);
      setTaskData([...sortedData]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTasks = async (taskId = null) => {
    setIsLoading(true);
    try {
      if (taskId) {
        const taskDoc = doc(db, "tasks", userData.uid, "userTasks", taskId);
        await deleteDoc(taskDoc);
        console.log("Single task deleted successfully.");
      } else if (storeCheckedId.length > 0) {
        console.log(storeCheckedId);
        const deletePromises = storeCheckedId.map((id) => {
          const taskDoc = doc(db, "tasks", id);
          return deleteDoc(taskDoc);
        });
        await Promise.all(deletePromises);
        console.log("All tasks deleted successfully.");
        setStoreCheckedId([]);
      }
      getTasks();
    } catch (error) {
      console.log("Error Deleting Task", error.message);
    }
  };

  const updateTasks = async (editTaskData, taskId) => {
    setIsLoading(true);
    try {
      if (taskId) {
        const taskDoc = doc(db, "tasks", userData.uid, "userTasks", taskId);
        await setDoc(taskDoc, editTaskData, { merge: true });
        setShowAddModal(false);
        setAddModalData(null);
      } else if (storeCheckedId.length > 0) {
        const updatePromises = storeCheckedId.map((id) => {
          const taskDoc = doc(db, "tasks", id);
          return setDoc(taskDoc, editTaskData, { merge: true });
        });
        await Promise.all(updatePromises);
        console.log("All tasks updated successfully.");
        setStoreCheckedId([]);
      }
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (editTaskData) => {
    setShowAddModal(true);
    setAddModalData(editTaskData);
    setSelectedTaskCard("");
  };

  useEffect(() => {
    if (fetchOnLoad) {
      getTasks();
    }
  }, [fetchOnLoad]);

  useEffect(() => {
    let filtered = taskData;
    if (filteredCategory) {
      filtered = filtered?.filter((task) => task.category === filteredCategory);
    }
    if (filteredDate) {
      const formattedDate = getFormattedDate(filteredDate);
      filtered = filtered?.filter((task) => task.dueDate === formattedDate);
    }
    if (searchField) {
      filtered = filtered?.filter((task) =>
        task.taskName.toLowerCase().includes(searchField.toLowerCase())
      );
    }

    const todoTasks = filtered?.filter((task) => task.status === "Todo") ?? [];
    const inProgressTasks =
      filtered?.filter((task) => task.status === "In-Progress") ?? [];
    const completedTasks =
      filtered?.filter((task) => task.status === "Completed") ?? [];
    const cards = [
      { cardName: "Todo", tasks: todoTasks },
      { cardName: "In-Progress", tasks: inProgressTasks },
      { cardName: "Completed", tasks: completedTasks },
    ];

    setCardData(cards);
  }, [taskData, filteredCategory, filteredDate, searchField]);

  return {
    getTasks,
    isLoading,
    addTask,
    deleteTasks,
    updateTasks,
    editTask,
  };
};

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../components/firebase";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";

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
  } = useContext(TaskContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAsc, setIsAsc] = useState(false);

  const addTask = async (taskObj) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "tasks"), taskObj);
      setShowAddModal(false);
      setIsLoading(false);
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const getTasks = async () => {
    try {
      const taskCollections = await getDocs(collection(db, "tasks"));
      const tasks = taskCollections.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTaskData(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTasks = async (taskId = null) => {
    console.log("id", taskId);
    try {
      if (taskId) {
        const taskDoc = doc(db, "tasks", taskId);
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
    try {
      if (taskId) {
        const taskDoc = doc(db, "tasks", taskId);
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

  const compareFun = (task1, task2) => {
    return new Date(task1.dueDate) - new Date(task2.dueDate);
  };

  const sortTaskData = () => {
    const sortedData = [...taskData].sort((task1, task2) =>
      isAsc ? compareFun(task1, task2) : compareFun(task2, task1)
    );
    setIsAsc(!isAsc);
    setTaskData(sortedData);
  };

  useEffect(() => {
    if (fetchOnLoad) {
      console.log("first");
      getTasks();
    }
  }, [fetchOnLoad]);

  useEffect(() => {
    const todoTasks = taskData?.filter((task) => task.status === "Todo") ?? [];
    const inProgressTasks =
      taskData?.filter((task) => task.status === "InProgress") ?? [];
    const completedTasks =
      taskData?.filter((task) => task.status === "Completed") ?? [];
    const cards = [
      { cardName: "Todo", tasks: todoTasks },
      { cardName: "In-Progress", tasks: inProgressTasks },
      { cardName: "Completed", tasks: completedTasks },
    ];
    setCardData(cards);
  }, [taskData]);

  return {
    getTasks,
    isLoading,
    addTask,
    deleteTasks,
    updateTasks,
    sortTaskData,
    editTask,
  };
};

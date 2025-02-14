import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect } from "react";
import { TaskContext, TaskContextType } from "../context/TaskContext";
import { getSortedData } from "../utils/getSortedData";
import { getFormattedDate } from "../utils/getFormattedDate";
import { taskStatusOptions } from "../constants";
import { TaskObjType } from "../interface";

export const useTask = ({ fetchOnLoad = false } = {}) => {
  const {
    taskData,
    setTaskData,
    setShowAddModal,
    setAddModalData,
    setCardData,
    storeCheckedId,
    setStoreCheckedId,
    isLoading,
    setIsLoading,
    userData,
    filteredCategory,
    filteredDate,
    searchField,
  } = useContext<TaskContextType>(TaskContext);

  const addTask = async (taskObj: TaskObjType) => {
    setIsLoading(true);
    try {
      if (userData) {
        await addDoc(
          collection(db, "tasks", userData.uid, "userTasks"),
          taskObj
        );
        setShowAddModal(false);
        getTasks();
      }
    } catch (error: any) {
      console.error("Error adding task:", error.message);
    }
  };

  const getTasks = async () => {
    try {
      if (userData) {
        const taskCollections = await getDocs(
          collection(db, "tasks", userData.uid, "userTasks")
        );
        const tasks: TaskObjType[] = taskCollections.docs.map((doc) => ({
          ...(doc.data() as TaskObjType),
          id: doc.id,
        }));
        const sortedData = getSortedData(tasks, false);
        setTaskData([...sortedData]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTasks = async (taskId: string | null = null) => {
    setIsLoading(true);
    try {
      if (taskId && userData) {
        const taskDoc = doc(db, "tasks", userData.uid, "userTasks", taskId);
        await deleteDoc(taskDoc);
        console.log("Single task deleted successfully.");
      } else if (storeCheckedId.length > 0 && userData) {
        console.log(storeCheckedId);
        const deletePromises = storeCheckedId.map((id) => {
          const taskDoc = doc(db, "tasks", userData.uid, "userTasks", id);
          return deleteDoc(taskDoc);
        });
        await Promise.all(deletePromises);
        console.log("All tasks deleted successfully.");
        setStoreCheckedId([]);
      }
      getTasks();
    } catch (error: any) {
      console.log("Error Deleting Task", error.message);
    }
  };

  const updateTasks = async (
    editTaskData: Partial<TaskObjType>,
    taskId: string | undefined
  ) => {
    setIsLoading(true);
    try {
      if (taskId && userData) {
        const taskDoc = doc(db, "tasks", userData.uid, "userTasks", taskId);
        await setDoc(taskDoc, editTaskData, { merge: true });
        setShowAddModal(false);
        setAddModalData(null);
      } else if (storeCheckedId.length > 0 && userData) {
        const updatePromises = storeCheckedId.map((id) => {
          const taskDoc = doc(db, "tasks", userData.uid, "userTasks", id);
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

  const editTask = (editTaskData: TaskObjType) => {
    setShowAddModal(true);
    setAddModalData(editTaskData);
  };

  useEffect(() => {
    if (fetchOnLoad) {
      getTasks();
    }
  }, [fetchOnLoad]);

  useEffect(() => {
    let filtered = taskData;
    if (filteredCategory) {
      filtered = filtered?.filter(
        (task: TaskObjType) => task.category === filteredCategory
      );
    }
    if (filteredDate) {
      const formattedDate = getFormattedDate(filteredDate);
      filtered = filtered?.filter(
        (task: TaskObjType) => task.dueDate === formattedDate
      );
    }
    if (searchField) {
      filtered = filtered?.filter((task: TaskObjType) =>
        task.taskName.toLowerCase().includes(searchField.toLowerCase())
      );
    }

    const cards = taskStatusOptions.map((status) => ({
      cardName: status,
      tasks:
        filtered?.filter((task: TaskObjType) => task.status === status) ?? [],
    }));

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

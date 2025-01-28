import "./Home.css";
import Header from "../Header/Header.js";
import { Outlet, useNavigate } from "react-router-dom";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import TaskHeading from "../TaskHeading/TaskHeading.js";
import TaskCard from "../TaskCard/TaskCard.js";
import AddTaskModal from "../AddTaskModal/AddTaskModal.js";
import Loader from "../Loader/Loader.js";
import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import MultiSelectModal from "../MultiSelectModal/MultiSelectModal.js";

const Home = ({ userData }) => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskCard, setSelectedTaskCard] = useState("");
  const [storeCheckedId, setStoreCheckedId] = useState([]);
  const [addModalData, setAddModalData] = useState(null);
  const [isShowMultiselectPopUp, setIsShowMultiselectPopUp] = useState(true);
  const [isAsc, setIsAsc] = useState(false);

  const addTask = async (taskObj) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "tasks"), taskObj);
      setShowModal(false);
      setIsLoading(false);
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const getTasks = async () => {
    try {
      const taskCollections = await getDocs(collection(db, "tasks"));
      setTaskData(
        taskCollections.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTasks = async (id) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const updateTask = async (editTaskData, taskId) => {
    try {
      console.log(editTaskData);
      const taskDoc = doc(db, "tasks", taskId);
      await setDoc(taskDoc, editTaskData, { merge: true });
      setShowModal(false);
      setAddModalData(null);
      getTasks();
    } catch (error) {
      console.error("Error while Upadting task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // const displayCardName = ["Todo", "In-Progress", "Completed"];

  useEffect(() => {
    const todoTasks = taskData?.filter((task) => task.status === "Todo") ?? [];
    // console.log(todoTasks);
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

  const handleCheckBoxClick = (taskId) => {
    if (storeCheckedId.includes(taskId)) {
      const newCheckedId = storeCheckedId.filter((id) => id !== taskId);
      setStoreCheckedId([...newCheckedId]);
    } else {
      setStoreCheckedId([...storeCheckedId, taskId]);
    }
  };

  const deleteCheckedIds = async () => {
    try {
      const deletePromises = storeCheckedId.map((id) => {
        const taskDoc = doc(db, "tasks", id);
        return deleteDoc(taskDoc);
      });
      await Promise.all(deletePromises);
      console.log("All tasks deleted successfully.");
      getTasks();
      setStoreCheckedId([]);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (editTaskData) => {
    setShowModal(true);
    setAddModalData(editTaskData);
    setSelectedTaskCard("");
  };

  const compareFun = (task1, task2) => {
    return new Date(task1.dueDate) - new Date(task2.dueDate);
  };
  const sortData = () => {
    const sortedData = taskData.sort((task1, task2) =>
      isAsc ? compareFun(task1, task2) : compareFun(task2, task1)
    );
    setIsAsc(!isAsc);
    setTaskData([...sortedData]);
  };

  return (
    <div className="home_container">
      <Header dataApi={userData} />
      <SearchAndFilter openModal={() => setShowModal(true)} />
      <div className="underLine"></div>
      <Outlet />
      <TaskHeading
        sortData={() => {
          sortData();
        }}
      />
      <div className="task_view">
        {cardData.map((card) => (
          <TaskCard
            key={card.cardName}
            cardName={card.cardName}
            tasks={card.tasks}
            openModal={() => setShowModal(true)}
            deleteTask={deleteTasks}
            setSelectedTaskCard={(cardName) => setSelectedTaskCard(cardName)}
            showEditDeleteModal={card.cardName === selectedTaskCard}
            setIsShowMultiSelectModal={(id) => handleCheckBoxClick(id)}
            storeCheckedId={storeCheckedId}
            editTask={(editTaskData) => editTask(editTaskData)}
            updateTask={() => updateTask()}
          />
        ))}
      </div>
      {storeCheckedId.length > 0 && (
        <MultiSelectModal
          checkedIds={storeCheckedId}
          deleteCheckedIds={deleteCheckedIds}
          setIsCloseMultiselectPopUp={() => {
            setStoreCheckedId([]);
          }}
        />
      )}
      {showModal && (
        <AddTaskModal
          data={addModalData}
          addTask={(taskObj) => addTask(taskObj)}
          updateTask={(updatedTaskdata, taskId) =>
            updateTask(updatedTaskdata, taskId)
          }
          closeModal={() => {
            setShowModal(false);
            setAddModalData(null);
          }}
        />
      )}
      {(isLoading || !taskData) && <Loader />}
    </div>
  );
};

export default Home;

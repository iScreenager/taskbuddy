import "./Home.css";
import Header from "../Header/Header.js";
import { useLocation } from "react-router-dom";
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
} from "firebase/firestore";
import { db } from "../firebase.js";

const Home = () => {
  const [taskData, setTaskData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskCard, setSelectedTaskCard] = useState("");

  const { state } = useLocation();
  const getdataAPI = JSON.parse(state);
  const taskCollectionRef = collection(db, "tasks");
  const addTask = async (taskObj) => {
    setIsLoading(true);
    try {
      const result = await addDoc(taskCollectionRef, taskObj);
      setIsLoading(false);
      setShowModal(false);
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const getTasks = async () => {
    const taskCollections = await getDocs(taskCollectionRef);
    setTaskData(
      taskCollections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
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

  useEffect(() => {
    getTasks();
  }, []);

  // const displayCardName = ["Todo", "In-Progress", "Completed"];

  useEffect(() => {
    const todoTasks = taskData.filter((task) => task.status === "Todo");
    // console.log(todoTasks);
    const inProgressTasks = taskData.filter(
      (task) => task.status === "InProgress"
    );
    const completedTasks = taskData.filter(
      (task) => task.status === "Completed"
    );

    const cards = [
      { cardName: "Todo", tasks: todoTasks },
      { cardName: "In-Progress", tasks: inProgressTasks },
      { cardName: "Completed", tasks: completedTasks },
    ];
    // console.log(cards);
    setCardData(cards);
  }, [taskData]);

  return (
    <div className="home_container">
      <Header dataApi={getdataAPI} />
      <SearchAndFilter openModal={() => setShowModal(true)} />
      <div className="underLine"></div>
      <TaskHeading />
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
          />
        ))}
      </div>
      {showModal && (
        <AddTaskModal
          addTask={(taskObj) => addTask(taskObj)}
          closeModal={() => setShowModal(false)}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;

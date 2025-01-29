import "./Home.css";
import Header from "../Header/Header.js";
import { Outlet } from "react-router-dom";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";
import AddTaskModal from "../AddTaskModal/AddTaskModal.js";
import Loader from "../Loader/Loader.js";
import { useContext } from "react";
import MultiSelectModal from "../MultiSelectModal/MultiSelectModal.js";
import { useTask } from "../../hooks/useTask.js";
import { TaskContext } from "../../context/TaskContext.js";

const Home = ({ userData }) => {
  const { isLoading } = useTask({
    fetchOnLoad: true,
  });
  const { taskData, showAddModal, storeCheckedId } = useContext(TaskContext);

  return (
    <div className="home_container">
      <Header dataApi={userData} />
      <SearchAndFilter />
      <div className="underLine"></div>
      <Outlet />
      {storeCheckedId.length > 0 && <MultiSelectModal />}
      {showAddModal && <AddTaskModal />}
      {(isLoading || !taskData) && <Loader />}
    </div>
  );
};

export default Home;

import "./Home.css";
import Header from "../Header/Header.js";
import { Outlet } from "react-router-dom";
import AddTaskModal from "../AddTaskModal/AddTaskModal.js";
import Loader from "../Loader/Loader.js";
import { useContext } from "react";
import MultiSelectModal from "../MultiSelectModal/MultiSelectModal.js";
import { useTask } from "../../hooks/useTask.js";
import { useIsMobile } from "../../hooks/useIsMobile.js";
import { TaskContext } from "../../context/TaskContext.js";
import SearchAndFilter from "../Header/components/SearchAndFilter/SearchAndFilter.js";

const Home = () => {
  const { userData } = useContext(TaskContext);
  useTask({
    fetchOnLoad: true,
  });
  const { taskData, showAddModal, storeCheckedId, isLoading } =
    useContext(TaskContext);

  const { isMobile } = useIsMobile();

  return (
    <div
      className="home_container"
      style={{ padding: isMobile ? "" : "40px 36px 0 36px" }}>
      <Header dataApi={userData} />
      <div
        style={{
          width: "100%",
          padding: isMobile ? "18px 16px" : "",
          boxSizing: "border-box",
          height: "100%",
        }}>
        <SearchAndFilter />
        <Outlet />
      </div>
      {storeCheckedId.length > 0 && <MultiSelectModal />}
      {showAddModal && <AddTaskModal />}
      {(isLoading || !taskData) && <Loader />}
    </div>
  );
};

export default Home;

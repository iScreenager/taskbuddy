import "./Home.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import MultiSelectModal from "../MultiSelectModal/MultiSelectModal";
import { useTask } from "../../hooks/useTask";
import { useIsMobile } from "../../hooks/useIsMobile";
import { TaskContext, TaskContextType } from "../../context/TaskContext";
import SearchAndFilter from "../Header/components/SearchAndFilter/SearchAndFilter";

const Home = () => {
  const { userData } = useContext<TaskContextType>(TaskContext);
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

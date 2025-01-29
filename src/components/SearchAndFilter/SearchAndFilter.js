import "./SearchAndFilter.css";
import dropDown_down_icons from "../../assets/dropDown_down_icons.png";
import search_icon from "../../assets/search_icon.png";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

const SearchAndFilter = () => {
  const { setShowAddModal } = useContext(TaskContext);
  return (
    <div className="main_container">
      <div className="filter_container">
        <p className="filter_text">Filter by:</p>
        <div className="filter_dropDown category">
          <p>Category</p>
          <img src={dropDown_down_icons}></img>
        </div>
        <div className="filter_dropDown dueDate">
          <p>Due Date</p>
          <img src={dropDown_down_icons}></img>
        </div>
      </div>
      <div className="search_container">
        <div className="search_box">
          <img src={search_icon}></img>
          <input type="text" placeholder="Search"></input>
        </div>
        <button className="addTask_btn" onClick={() => setShowAddModal(true)}>
          ADD TASK
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;

import "./SearchAndFilter.css";
import dropDown_down_icons from "../../assets/dropDown_down_icons.png";
import search_icon from "../../assets/search_icon.png";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import Category from "../Category/Category";
import { useIsMobile } from "../../hooks/useIsMobile";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchAndFilter = () => {
  const { isMobile } = useIsMobile();
  const {
    setShowAddModal,
    setFilteredCategory,
    filteredCategory,
    setFilteredDate,
    filteredDate,
    searchField,
    setSearchField,
  } = useContext(TaskContext);
  const [isCategory, setIsCategory] = useState(false);

  return (
    <div
      className={
        !isMobile
          ? "main_container"
          : " main_container main_container-moblie-view"
      }>
      <div className="filter_container">
        <p className="filter_text">Filter by:</p>
        <div className="filter_option_box">
          <div
            className="filter_dropDown category"
            onClick={() => setIsCategory(!isCategory)}>
            <p>{filteredCategory ?? "Category"}</p>
            <img src={dropDown_down_icons}></img>
            {isCategory && <Category />}
          </div>
          <DatePicker
            className="filter_dropDown dueDate"
            selected={filteredDate}
            dateFormat="dd / MM / yyyy"
            onChange={(currentDate) => {
              setFilteredDate(currentDate);
            }}
            placeholderText={filteredDate ? "" : "Select Date"}
            showIcon
            calendarIconClassName="calendarIcon"
          />
          <div
            className="reset"
            onClick={() => {
              setFilteredCategory(null);
              setFilteredDate(null);
              setSearchField(null);
            }}>
            <p>Reset</p>
          </div>
        </div>
      </div>
      <div className="search_container">
        <div className="search_box">
          <img src={search_icon}></img>
          <input
            type="text"
            value={searchField ?? ""}
            placeholder="Search"
            onChange={(e) => setSearchField(e.target.value)}></input>
        </div>

        <button className="addTask_btn" onClick={() => setShowAddModal(true)}>
          ADD TASK
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;

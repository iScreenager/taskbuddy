import "./SearchAndFilter.css";
import dropDown_down_icons from "../../assets/dropDown_down_icons.png";
import search_icon from "../../assets/search_icon.png";
import { useContext, useRef } from "react";
import { TaskContext } from "../../context/TaskContext";
import Category from "../Category/Category";
import { useIsMobile } from "../../hooks/useIsMobile";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../assets/Calender.png";
import reset_icon from "../../assets/reset_icon.png";

const SearchAndFilter = () => {
  const { isMobile } = useIsMobile();
  const datePickerRef = useRef(null);
  const {
    setShowAddModal,
    setFilteredCategory,
    filteredCategory,
    setFilteredDate,
    filteredDate,
    searchField,
    setSearchField,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
  } = useContext(TaskContext);

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
            onClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}>
            <p>{filteredCategory ?? "Category"}</p>
            <img src={dropDown_down_icons} draggable="false"></img>
            {isCategoryModalOpen && <Category />}
          </div>
          <div style={{ position: "relative" }}>
            <DatePicker
              ref={datePickerRef}
              className="filter_dropDown dueDate"
              selected={filteredDate}
              dateFormat="dd / MM / yyyy"
              onChange={(currentDate) => {
                setFilteredDate(currentDate);
              }}
              placeholderText={filteredDate ? "" : "Select Date"}
            />
            <img
              src={Calendar}
              style={{
                position: "absolute",
                width: "12px",
                height: "12px",
                right: "10px",
                top: "8px",
                cursor: "pointer",
              }}
              alt="calender icon"
              className="calendar_icon"
              draggable="false"
              onClick={() => datePickerRef.current.setFocus()}
            />
          </div>

          <div
            className="reset"
            onClick={() => {
              setFilteredCategory(null);
              setFilteredDate(null);
              setSearchField(null);
              setIsCategoryModalOpen(false);
            }}>
            <img
              src={reset_icon}
              style={{ width: "15px", height: "15px" }}
              alt="reset icon"></img>
            <p>Reset</p>
          </div>
        </div>
      </div>
      <div className="search_container">
        <div className="search_box">
          <img src={search_icon} draggable="false"></img>
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

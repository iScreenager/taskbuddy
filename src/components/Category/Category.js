import { useContext } from "react";
import "./Category.css";
import { TaskContext } from "../../context/TaskContext";

const Category = () => {
  const { setFilteredCategory } = useContext(TaskContext);
  return (
    <div className="category_option">
      <p onClick={() => setFilteredCategory("Work")}>Work</p>
      <p onClick={() => setFilteredCategory("Personal")}>Personal</p>
    </div>
  );
};

export default Category;

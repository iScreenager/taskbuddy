import { useContext, useState } from "react";
import "./Category.css";
import { TaskContext } from "../../context/TaskContext";

const Category = ({ setCategory, isOpenAddTask }) => {
  const { setFilteredCategory, isCategoryModalOpen } = useContext(TaskContext);

  const [isBold, setIsBold] = useState("");

  const handleCategoryClick = (category) => {
    if (isCategoryModalOpen) {
      setFilteredCategory(category);
    }
    if (isOpenAddTask) {
      setCategory(category);
      setIsBold(category);
    }
  };
  return (
    <div className="category_option">
      <p
        onClick={() => handleCategoryClick("Work")}
        style={{ fontWeight: isBold === "Work" ? "bold" : "" }}>
        Work
      </p>
      <p
        onClick={() => handleCategoryClick("Personal")}
        style={{ fontWeight: isBold === "Personal" ? "bold" : "" }}>
        Personal
      </p>
    </div>
  );
};

export default Category;

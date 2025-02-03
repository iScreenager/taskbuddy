import { useContext, useState } from "react";
import "./Category.css";
import { TaskContext } from "../../context/TaskContext";

const Category = ({ setCategory }) => {
  const { setFilteredCategory, filteredCategory } = useContext(TaskContext);
  const [isBold, setIsBold] = useState("");

  const handleCategoryClick = (category) => {
    if (filteredCategory !== null) {
      setFilteredCategory(category);
    } else {
      setCategory(category);
      setIsBold(category);
    }
  };
  return (
    <div className="category_option">
      <p
        onClick={() => handleCategoryClick("Work")}
        style={{ fontWeight: isBold === "Work" ? "bold" : "normal" }}>
        Work
      </p>
      <p
        onClick={() => handleCategoryClick("Personal")}
        style={{ fontWeight: isBold === "Personal" ? "bold" : "normal" }}>
        Personal
      </p>
    </div>
  );
};

export default Category;

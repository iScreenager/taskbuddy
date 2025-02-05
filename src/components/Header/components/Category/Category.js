import { useContext, useEffect, useRef, useState } from "react";
import "./Category.css";
import { TaskContext } from "../../../../context/TaskContext";

const Category = ({ setCategory, isOpenAddTask, closeModal = () => {} }) => {
  const { setFilteredCategory, isCategoryModalOpen } = useContext(TaskContext);

  const [isBold, setIsBold] = useState("");

  const handleCategoryClick = (category) => {
    if (isCategoryModalOpen && !isOpenAddTask) {
      setFilteredCategory(category);
    }
    if (isOpenAddTask) {
      setCategory(category);
      setIsBold(category);
    }
  };

  const modalRef = useRef(null);

  const checkClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setTimeout(() => closeModal(), 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", checkClickOutside, true);
    };
  }, []);
  return (
    <div className="category_option" ref={modalRef}>
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

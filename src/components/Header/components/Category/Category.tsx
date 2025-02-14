import React, { useContext, useEffect, useRef, useState } from "react";
import "./Category.css";
import { TaskContext } from "../../../../context/TaskContext";

interface CategoryProps {
  setCategory?: (category: string) => void;
  isOpenAddTask?: boolean;
  closeModal: () => void;
}

const Category = ({
  setCategory,
  isOpenAddTask = false,
  closeModal,
}: CategoryProps) => {
  const { setFilteredCategory, isCategoryModalOpen } = useContext(TaskContext);

  const [isBold, setIsBold] = useState("");

  const handleCategoryClick = (category: string) => {
    if (isCategoryModalOpen && !isOpenAddTask) {
      setFilteredCategory(category);
    }
    if (isOpenAddTask) {
      setCategory?.(category);
      setIsBold(category);
    }
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  const checkClickOutside = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Node)) {
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

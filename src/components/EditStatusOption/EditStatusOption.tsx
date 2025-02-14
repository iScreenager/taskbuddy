import "./EditStatusOption.css";
import { useTask } from "../../hooks/useTask";
import { useEffect, useRef, useState } from "react";
import { taskStatusOptions } from "../../constants";
import { TaskStatusOption } from "../../interface";

interface EditStatusOptionProps {
  id?: string;
  isFromMultiSelect?: boolean;
  setStatus: (status: TaskStatusOption) => void;
  closeModal?: () => void;
}

const EditStatusOption = ({
  id = "",
  isFromMultiSelect = false,
  setStatus,
  closeModal,
}: EditStatusOptionProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const checkClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setTimeout(() => {
        if (closeModal) closeModal();
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkClickOutside);
    };
  }, []);

  const { updateTasks } = useTask();
  const [isBold, setIsBold] = useState("");

  const handleStatusClick = (status: TaskStatusOption) => {
    if ((id !== undefined && id !== "") || isFromMultiSelect) {
      updateTasks({ status }, id);
    } else {
      setStatus(status);
      setIsBold(status);
    }
  };

  return (
    <div ref={modalRef} className="ChangeStatusOption_box">
      {taskStatusOptions.map((status, index) => {
        return (
          <p
            key={index}
            // value={status}
            onClick={() => handleStatusClick(status)}
            style={{ fontWeight: isBold === status ? "bold" : "" }}>
            {status}
          </p>
        );
      })}
    </div>
  );
};

export default EditStatusOption;

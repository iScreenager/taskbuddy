import "./EditStatusOption.css";
import { useTask } from "../../hooks/useTask";
import { useState } from "react";

const EditStatusOption = ({
  id = null,
  isFromMultiSelect = false,
  setStatus,
}) => {
  const { updateTasks } = useTask();
  const [isBold, setIsBold] = useState("");

  const handleStatusClick = (status) => {
    if (id !== null) {
      updateTasks({ status }, id);
    } else {
      setStatus(status);
      setIsBold(status);
    }
  };

  const statusTypes = ["Todo", "In-Progress", "Completed"];
  return (
    <div className="ChangeStatusOption_box">
      {statusTypes.map((status, index) => {
        return (
          <p
            key={index}
            value={status}
            onClick={() => handleStatusClick(status)}
            style={{ fontWeight: isBold === status ? "bold" : "normal" }}>
            {status}
          </p>
        );
      })}
    </div>
  );
};

export default EditStatusOption;

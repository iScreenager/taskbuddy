import "./EditStatusOption.css";
import { useTask } from "../../hooks/useTask";

const EditStatusOption = ({ id = null, isFromMultiSelect = false }) => {
  const { updateTasks } = useTask();

  const statusTypes = ["Todo", "In-Progress", "Completed"];
  return (
    <div className="ChangeStatusOption_box">
      {statusTypes.map((status, index) => {
        return (
          <p
            key={index}
            value={status}
            onClick={() => updateTasks({ status }, id)}>
            {status}
          </p>
        );
      })}
    </div>
  );
};

export default EditStatusOption;

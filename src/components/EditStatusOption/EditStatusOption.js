import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./EditStatusOption.css";

const EditStatusOption = (props) => {
  const updateTaskStatus = async (selectedStatus) => {
    try {
      const taskRef = doc(db, "tasks", props.id);
      await setDoc(taskRef, { status: selectedStatus }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ChangeStatusOption_box">
      <p value="ToDo" onClick={() => updateTaskStatus("Todo")}>
        ToDo
      </p>
      <p value="InProgress" onClick={() => updateTaskStatus("InProgress")}>
        In-progress
      </p>
      <p value="Completed" onClick={() => updateTaskStatus("Completed")}>
        Completed
      </p>
    </div>
  );
};

export default EditStatusOption;

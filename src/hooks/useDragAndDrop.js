import { useTask } from "./useTask";

export const useDragAndDrop = () => {
  const { updateTasks } = useTask();
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };
  const handleDragEnd = (e) => {
    e.dataTransfer.clearData();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    updateTasks({ status }, taskId);
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};

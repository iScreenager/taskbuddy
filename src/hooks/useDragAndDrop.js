import { useTask } from "./useTask";

export const useDragAndDrop = () => {
  const { updateTasks } = useTask();
  const handleDragStart = (e, taskId, taskStatus) => {
    e.dataTransfer.setData("taskId", taskId.toString());
    e.dataTransfer.setData("taskStatus", taskStatus.toString());
  };
  const handleDragEnd = (e) => {
    e.dataTransfer.clearData();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    const taskStatus = e.dataTransfer.getData("taskStatus");
    if (taskStatus !== status) {
      updateTasks({ status }, taskId);
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};

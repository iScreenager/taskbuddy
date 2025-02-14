import { DragEvent } from "react";
import { useTask } from "./useTask";
import { TaskStatusOption } from "../interface";

export const useDragAndDrop = () => {
  const { updateTasks } = useTask();
  const handleDragStart = (
    e: DragEvent,
    taskId: string,
    taskStatus: string
  ): void => {
    e.dataTransfer.setData("taskId", taskId.toString());
    e.dataTransfer.setData("taskStatus", taskStatus.toString());
  };
  const handleDragEnd = (e: DragEvent) => {
    e.dataTransfer.clearData();
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent, status: TaskStatusOption) => {
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

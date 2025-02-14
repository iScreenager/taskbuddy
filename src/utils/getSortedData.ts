import { TaskObjType } from "../interface";

const compareFun = (task1: TaskObjType, task2: TaskObjType) => {
  return new Date(task1.dueDate).getTime() - new Date(task2.dueDate).getTime();
};

export const getSortedData = (data: TaskObjType[], isAsc: boolean) => {
  const sortedData = data.sort((task1, task2) =>
    isAsc ? compareFun(task1, task2) : compareFun(task2, task1)
  );
  return sortedData;
};

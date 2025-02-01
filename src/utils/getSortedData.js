const compareFun = (task1, task2) => {
  return new Date(task1.dueDate) - new Date(task2.dueDate);
};

export const getSortedData = (data, isAsc) => {
  const sortedData = data.sort((task1, task2) =>
    isAsc ? compareFun(task1, task2) : compareFun(task2, task1)
  );
  return sortedData;
};

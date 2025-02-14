export interface TaskObjType {
  id?: string;
  taskName: string;
  description?: string;
  dueDate: string;
  status: TaskStatusOption;
  category: string;
}

export interface CardDataType {
  cardName: TaskStatusOption;
  tasks: TaskObjType[];
}

export interface UserData {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
}

export enum TaskStatusOption {
  NOSTATUS = "",
  TODO = "Todo",
  INPROGRESS = "In-Progress",
  COMPLETED = "Completed",
}

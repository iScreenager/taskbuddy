import { format } from "date-fns";

export const getFormattedDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

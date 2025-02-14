import { format } from "date-fns";

export const getFormattedDate = (date: Date | null): string => {
  return date ? format(date, "yyyy-MM-dd") : "";
};

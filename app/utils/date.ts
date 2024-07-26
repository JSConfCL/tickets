import { formatDistanceToNow, subDays, format } from "date-fns";

export const formatDate = (date: string | Date | null | undefined): string => {
  if (date == null) {
    return "";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);
  const isOverAWeekFromNow = parsedDate > subDays(new Date(), 7);
  const relativeDate = formatDistanceToNow(parsedDate, {
    addSuffix: true,
  });
  const formattedDate = format(parsedDate, "cccc - d 'de' MMMM, yyyy");

  return isOverAWeekFromNow ? formattedDate : relativeDate;
};

export const formatTime = (date: string | Date | null | undefined): string => {
  if (date == null) {
    return "";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  return format(parsedDate, "hh:mma");
};

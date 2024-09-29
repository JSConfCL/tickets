import { formatDistanceToNow, subDays, format } from "date-fns";

const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const formatDate = (date: string | Date | null | undefined): string => {
  if (date == null) {
    return "";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);
  const isOverAWeekFromNow = parsedDate > subDays(new Date(), 7);
  const relativeDate = formatDistanceToNow(parsedDate, {
    addSuffix: true,
  });
  const formattedDate = capitalizeFirstLetter(
    format(parsedDate, "EEEE d 'de' MMMM, yyyy"),
  );

  return isOverAWeekFromNow ? formattedDate : relativeDate;
};

export const formatCalendarDate = (
  date: string | Date | null | undefined,
): string => {
  if (date == null) {
    return "";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  return format(parsedDate, "dd/MM/yyyy");
};

export const formatTime = (date: string | Date | null | undefined): string => {
  if (date == null) {
    return "";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  return format(parsedDate, "hh:mma");
};

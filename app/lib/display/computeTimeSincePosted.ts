import dayjs, { Dayjs } from "dayjs";

const computeTimeSincePosted = (time: Dayjs): string => {
  const now = dayjs();
  const diffInMinutes = now.diff(time, "minute");
  const diffInHours = now.diff(time, "hour");
  const diffInDays = now.diff(time, "day");

  if (diffInMinutes <= 1) {
    return "now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`; // e.g., "42m"
  } else if (diffInHours < 24) {
    return `${diffInHours}h`; // e.g., "3h"
  } else {
    return `${diffInDays}d`; // e.g., "2d"
  }
};

export default computeTimeSincePosted;

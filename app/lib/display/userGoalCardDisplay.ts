import dayjs, { Dayjs } from "dayjs";
import { UserGoal } from "@/types/model";

type PlotPoints = {
  title: string;
  value: number;
  color: string;
};

type PieChartData = {
  data: Array<PlotPoints>;
  percentCompleted: String;
};

const computePieChartData = (userGoal: UserGoal): PieChartData => {
  const startDate = dayjs(String(userGoal.startDate));
  const endDate = dayjs(String(userGoal.endDate));

  if (startDate.isAfter(dayjs())) {
    return {
      data: [
        { title: "completed", value: 0, color: "#1D5D9B" },
        { title: "not completed", value: 100, color: "#D3D3D3" },
      ],
      percentCompleted: "0 %",
    };
  }

  const totalDiff = Math.abs(startDate.diff(endDate, "days"));
  const currentDiff = Math.abs(dayjs().diff(endDate, "days"));

  return {
    data: [
      { title: "completed", value: totalDiff - currentDiff, color: "#1D5D9B" },
      { title: "not completed", value: currentDiff, color: "#D3D3D3" },
    ],
    percentCompleted:
      String(Math.floor(((totalDiff - currentDiff) / totalDiff) * 100)) + "%",
  };

  //return [
  //{ title: "completed", value: totalDiff - currentDiff, color: "#1D5D9B" },
  //{ title: "not completed", value: currentDiff, color: "#D3D3D3" },
  //];
};

const computeTimeLeftForGoal = (userGoal: UserGoal): string => {
  const endDate = new Date(String(userGoal.endDate));
  const startDate = new Date(String(userGoal.startDate));
  const DEFAULT_DATE = new Date("1970-01-01T00:00:00.000Z");

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30;
  const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 30 * 12;

  if (endDate.getTime() === DEFAULT_DATE.getTime()) return "Lifelong goal";

  const utc1 = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  const utc2 = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  const diffInDays = Math.floor((utc1 - utc2) / _MS_PER_DAY);
  const diffInMonths = Math.floor((utc1 - utc2) / _MS_PER_MONTH);
  const diffInYears = Math.floor((utc1 - utc2) / _MS_PER_YEAR);

  if (diffInDays < 0) return `finished`;
  if (diffInDays < 30) return `${diffInDays} days left`;
  if (diffInMonths < 12) return `${diffInMonths} months left`;
  return `${diffInYears} years left`;
};

const isDefaultDate = (date: Dayjs): boolean | null => {
  if (!date) {
    return false;
  }
  const DEFAULT_DATE = new Date("1970-01-01T00:00:00.000Z");
  return date.isSame(DEFAULT_DATE);
};

export { computePieChartData, computeTimeLeftForGoal, isDefaultDate };

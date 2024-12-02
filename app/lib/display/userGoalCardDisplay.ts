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
  const isLifeLongGoal = isDefaultDate(endDate);

  const totalDiff = Math.abs(startDate.diff(endDate, "days"));
  const currentDiff = Math.abs(dayjs().diff(endDate, "days"));

  // goal has not started yet or is a life long goal
  if (startDate.isAfter(dayjs()) || isLifeLongGoal) {
    return {
      data: [
        { title: "completed", value: 0, color: "#1D5D9B" },
        { title: "not completed", value: 100, color: "#D3D3D3" },
      ],
      percentCompleted: "0 %",
    };
  }

  // goal has ended
  else if(dayjs().isAfter(endDate)){
    return {
      data: [
        { title: "completed", value: 100, color: "#1D5D9B" },
        { title: "not completed", value: 0, color: "#D3D3D3" },
      ],
      percentCompleted: "100 %",
    };
  }

  // goal is still ongoing
  return {
    data: [
      { title: "completed", value: totalDiff - currentDiff, color: "#1D5D9B" },
      { title: "not completed", value: currentDiff, color: "#D3D3D3" },
    ],
    percentCompleted:
      String(Math.floor(((totalDiff - currentDiff) / totalDiff) * 100)) + "%",
  };

};

const computeTimeLeftForGoal = (dateRange: {
  endDate: Date;
  startDate: Date;
}): string => {
  const endDate = dayjs(dateRange.endDate);
  const startDate = dayjs(dateRange.startDate);
  const DEFAULT_DATE = dayjs("1970-01-01T00:00:00.000Z");
  const today = dayjs();

  if (endDate.isSame(DEFAULT_DATE)) return "Lifelong goal";
  else if(dayjs().isAfter(endDate)) return "Finished";
  else if(dayjs().isBefore(startDate)) return "Not started";

  const diffInDays = endDate.diff(today, "day");
  const diffInMonths = endDate.diff(today, "month");
  const diffInYears = endDate.diff(today, "year");

  if (diffInDays < 0) return `finished`;
  if (diffInDays === 1) return "1 day left";
  if (diffInDays < 30) return `${diffInDays} days left`;
  if (diffInMonths === 1) return "1 month left";
  if (diffInMonths < 12) return `${diffInMonths} months left`;
  if (diffInYears === 1) return "1 year left";
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

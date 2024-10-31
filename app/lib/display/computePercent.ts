import dayjs from "dayjs";
import { UserGoal } from "@/types/model";

const computePercentCompleted = (userGoal: UserGoal): string => {
  const startDate = dayjs(userGoal.startDate);
  const endDate = dayjs(userGoal.endDate);
  const totalDiff = Math.abs(startDate.diff(endDate, "days"));
  const currentDiff = Math.abs(dayjs().diff(endDate, "days"));

  return (
    String(Math.floor(((totalDiff - currentDiff) / totalDiff) * 100)) + "%"
  );
};
type PlotPoints = {
  title: string;
  value: number;
  color: string;
};

const getPieChartData = (userGoal: UserGoal): Array<PlotPoints> => {
  const startDate = dayjs(userGoal.startDate);
  const endDate = dayjs(userGoal.endDate);
  const totalDiff = Math.abs(startDate.diff(endDate, "days"));
  const currentDiff = Math.abs(dayjs().diff(endDate, "days"));
  const data =  [
    { title: "completed", value: currentDiff, color : "#D3D3D3"},
    { title: "not completed", value: totalDiff - currentDiff, color : "#1D5D9B" },
  ];
  return data;
};

export { computePercentCompleted, getPieChartData };

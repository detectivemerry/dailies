"use client";

import React from "react";
import dayjs from "dayjs";
import {
  AccessTime,
  CheckCircle,
  Edit,
  EditAttributesOutlined,
  Height,
  Replay,
  Whatshot,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PieChart } from "react-minimal-pie-chart";

import { UserGoal } from "@/types/model";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { encryptData } from "@/app/lib/encryption/encryption";
import {
  computePercentCompleted,
  getPieChartData,
} from "@/app/lib/display/computePercent";

interface UserGoalCardProps {
  userGoal: UserGoal;
}

export default function UserGoalCard({ userGoal }: UserGoalCardProps) {
  const router = useRouter();

  const percentCompleted = computePercentCompleted(userGoal);
  const pieChartData = getPieChartData(userGoal);

  const displayTimeLeftForGoal = (userGoal: UserGoal): string => {
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

  return (
    <div className="flex flex-col border p-3 mx-3">
      <div className="flex justify-between">
        <div className="text-main font-bold pb-3">{userGoal.name}</div>
        <div
          onClick={async () => {
            const encryptedId = await encryptData(String(userGoal._id));
            router.push(`/edit-goal/${encryptedId}`);
          }}
        >
          <Edit sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <div className="bg-lightGray rounded-2xl px-3">{userGoal.goalName}</div>
        <div className="bg-lightGray rounded-2xl px-3">
          {userGoal.frequencyCount} times {userGoal.frequencyPeriod}
        </div>
        <div className="bg-lightGray rounded-2xl px-3 flex">
          <div className="pr-[3px]">
            {displayTimeLeftForGoal(userGoal) === "finished" ? (
              <CheckCircle
                sx={{
                  color: "#1D5D9B",
                  fontSize: "1rem",
                  marginTop: "-3px",
                }}
              />
            ) : userGoal.endDate ? (
              <AccessTime
                sx={{
                  color: "#1D5D9B",
                  fontSize: "1rem",
                  marginTop: "-3px",
                }}
              />
            ) : (
              <Replay
                sx={{
                  color: "#1D5D9B",
                  fontSize: "1rem",
                  marginTop: "-3px",
                }}
              />
            )}
          </div>
          <div>{displayTimeLeftForGoal(userGoal)}</div>
        </div>
      </div>

      <div className="flex py-3 justify-center gap-8">
        <div className="flex items-center gap-1">
          <Whatshot sx={{ color: userGoal.streak ? "#1D5D9B" : "#D3D3D3" }} />
          {!userGoal.streak ? (
            <span className="text-lightGray">0 streak</span>
          ) : (
            <span className="text-main">{userGoal.streak} streak</span>
          )}
        </div>
        {userGoal.endDate && (
          <div className="flex gap-1">
            <div>
              <PieChart data={pieChartData} style={{ height: "25px" }} />
            </div>
            <div>{percentCompleted}</div>
          </div>
        )}
      </div>

      <div className="flex pt-3 justify-between items-center">
        <div>
          {userGoal.timesPostedCurrentPeriod}/{userGoal.frequencyCount}{" "}
          {userGoal.frequencyPeriod.replace(/per (\w+)/, "this $1")}
        </div>
        <div>
          <PrimaryButton
            text="Post"
            sx={{
              width: "6rem",
              borderRadius: "25px",
              fontWeight: "bold",
              color: "#1D5D9B",
              backgroundColor: "#FBEEAC",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#F9E47B",
              },
            }}
            onClick={() => {
              router.push("/post");
            }}
          />
        </div>
      </div>
    </div>
  );
}

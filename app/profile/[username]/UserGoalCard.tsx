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

  //const encryptedId = encryptData(String(userGoal._id));
  const percentCompleted = computePercentCompleted(userGoal);
  const pieChartData = getPieChartData(userGoal);

  const displayTimeLeftForGoal = (userGoal: UserGoal): string => {
    if (userGoal.endDate === "") return "Lifelong goal";

    const startDate = dayjs(userGoal.startDate);
    const endDate = dayjs(userGoal.endDate);
    const diffInDays = startDate.diff(endDate, "days") * -1;
    if (diffInDays < 0) return `finished`;
    if (diffInDays < 30) return `${diffInDays} days left`;
    const diffInMonths = startDate.diff(endDate, "months") * -1;
    if (diffInMonths < 12) return `${diffInMonths} months left`;
    const diffInYears = startDate.diff(endDate, "years") * -1;
    return `${diffInYears} years left`;
  };

  return (
    <div className="flex flex-col border p-3 mx-3">
      <div className="flex justify-between">
        <div className="text-main font-bold pb-3">{userGoal.name}</div>
        <div onClick={async () => { 
          const encryptedId = await encryptData(String(userGoal._id)) 
          router.push(`/edit-goal/${encryptedId}`)}}>
          <Edit sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <div className="bg-lightGray rounded-2xl px-3">{userGoal.name}</div>
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
          {/* {userGoal.streak} {" "} streak */}
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
        <div>{userGoal.timesPostedCurrentPeriod}/{userGoal.frequencyCount} {userGoal.frequencyPeriod.replace(/per (\w+)/, "this $1")}</div>
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

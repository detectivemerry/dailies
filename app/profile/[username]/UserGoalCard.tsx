"use client";

import React from "react";
import dayjs from "dayjs";
import {
  AccessTime,
  CheckCircle,
  Edit,
  Replay,
  Whatshot,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PieChart } from "react-minimal-pie-chart";

import { UserGoal } from "@/types/model";
import PrimaryButton from "@/components/buttons/PrimaryButton";

import {
  computePieChartData,
  computeTimeLeftForGoal,
  isDefaultDate,
} from "@/app/lib/display/userGoalCardDisplay";

interface UserGoalCardProps {
  userGoal: UserGoal;
}

export default function UserGoalCard({ userGoal }: UserGoalCardProps) {
  const router = useRouter();

  const { data : pieChartData, percentCompleted } = computePieChartData(userGoal);

  return (
    <div className="flex flex-col border p-3 mx-3">
      <div className="flex justify-between">
        <div className="text-main font-bold pb-3">{userGoal.name}</div>
        <div
          onClick={async () => {
            router.push(`/edit-goal/${userGoal._id}`);
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
            {computeTimeLeftForGoal(userGoal) === "finished" ? (
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
          <div>{computeTimeLeftForGoal(userGoal)}</div>
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
        {!isDefaultDate(dayjs(String(userGoal.endDate))) && (
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

"use client";

import React, { useEffect } from "react";
import dayjs from "dayjs";
import {
  AccessTime,
  CheckCircle,
  Edit,
  HourglassEmptyOutlined,
  Replay,
  Whatshot,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";

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
  const [clickedEdit, setClickedEdit] = useState<boolean>(false);

  const { data: pieChartData, percentCompleted } =
    computePieChartData(userGoal);

  const displayDate = computeTimeLeftForGoal({
    endDate: new Date(String(userGoal.endDate)),
    startDate: new Date(String(userGoal.startDate)),
  });

  useEffect(() => {
    if (clickedEdit) {
      const intervalId = setInterval(() => {
        setClickedEdit(false);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [clickedEdit]);

  return (
    <div className="flex flex-col border p-3 mx-3">
      <div className="flex justify-between">
        <div className="text-main font-bold pb-3">{userGoal.name}</div>
        <div
          className={`${clickedEdit && "bg-lightGray"} mb-[7px] px-2`}
          onClick={async () => {
            setClickedEdit(true);
            router.push(`/edit-goal/${userGoal._id}`);
          }}
        >
          <Edit sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <div
          className="bg-lightGray rounded-2xl px-3 py-[2px] bg-secondaryDark text-main"
          onClick={() => {
            router.push(`/community/${userGoal.goalName}`);
          }}
        >
          {userGoal.goalName}
        </div>
        <div className="bg-lightGray rounded-2xl px-3 py-[2px]">
          {userGoal.frequencyCount} times {userGoal.frequencyPeriod}
        </div>
        <div className="bg-lightGray rounded-2xl px-3 flex py-[3px]">
          <div className="pr-[3px]">
            {displayDate === "Finished" ? (
              <CheckCircle
                sx={{
                  color: "#1D5D9B",
                  fontSize: "1rem",
                  marginTop: "-3px",
                }}
              />
            ) : displayDate === "Not started" ? (
              <HourglassEmptyOutlined
                sx={{
                  color: "#1D5D9B",
                  fontSize: "1rem",
                  marginTop: "-2px",
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
          <div>{displayDate}</div>
        </div>
      </div>

      <div className="flex py-3 justify-center gap-8 pt-5">
        <div className="flex items-center gap-1">
          <Whatshot sx={{ color: userGoal.streak ? "#1D5D9B" : "#D3D3D3" }} />
          {!userGoal.streak ? (
            <span className="text-lightGray">0 streak</span>
          ) : (
            <span className="text-main">{userGoal.streak} streak</span>
          )}
        </div>
        {/* {!isDefaultDate(dayjs(String(userGoal.endDate))) && (
          <div className="flex gap-2 items-center">
            <div>
              <PieChart data={pieChartData} style={{ height: "25px" }} />
            </div>
            <div>{percentCompleted}</div>
          </div>
        )} */}
      </div>

      <div className="flex justify-between items-center">
        <div className="">
          {userGoal.timesPostedCurrentPeriod}/{userGoal.frequencyCount}{" "}
          {userGoal.frequencyPeriod.replace(/per (\w+)/, "this $1")}
        </div>
        <div>
          <PrimaryButton
            text="Post"
            sx={{
              fontSize: "0.75rem",
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

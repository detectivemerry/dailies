"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { GoalType, Goal } from "@/types/model";
import TitleHeader from "@/components/header/TitleHeader";
import getAvatarIcon from "./getAvatarIcon";

interface GoalListProps {
  goalType: GoalType;
  setGoalType: Dispatch<SetStateAction<GoalType | null>>;
  setViewGoalTypes : Dispatch<SetStateAction<boolean>>;
  setGoal: Dispatch<SetStateAction<Goal | null>>;
}

export default function GoalList({
  goalType,
  setGoalType,
  setViewGoalTypes,
  setGoal,
}: GoalListProps) {

  const handleSelectGoal = (goal : Goal) => {
    setGoal(goal);
    setViewGoalTypes(false);
    setGoalType(null)
  }

  return (
    <div className="w-full">
      <div>
        <TitleHeader
          title={goalType.name}
          onClick={() => setViewGoalTypes(false)}
        />
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-6 items-start">
        {goalType.goals &&
          goalType.goals.map((goal) => {
            const AvatarIcon = getAvatarIcon(goal.icon);
            return (
              <Button
                onClick={() => {handleSelectGoal(goal)}}               
                sx={{ textTransform: "none", padding: "0px" }}
                key={String(goal._id)}
              >
                <div className="flex flex-col self-auto items-center">
                  <div className="bg-secondary py-4 rounded-2xl w-[4.10rem]">
                    <AvatarIcon sx = {{fontSize : "2.125rem"}} />
                  </div>
                  <div className = "font-bold text-m">{goal.name}</div>
                </div>
              </Button>
            );
          })}
      </div>
    </div>
  );
}


"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Button, selectClasses } from "@mui/material";
import { GoalType, Goal } from "@/types/model";
import TitleHeader from "@/components/header/TitleHeader";
import getAvatarIcon from "./getAvatarIcon";

interface GoalListProps {
  selectedGoalType: GoalType;
  setSelectedGoalType: Dispatch<SetStateAction<GoalType | null>>;
  setGoal: Dispatch<SetStateAction<string | null>>;
}

export default function GoalList({
  selectedGoalType,
  setSelectedGoalType,
  setGoal,
}: GoalListProps) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  useEffect(() => {
    console.log(selectedGoalType);
  }, []);

  return (
    <div className="w-full">
      <div>
        <TitleHeader
          title={selectedGoalType.name}
          onClick={() => setSelectedGoalType(null)}
        />
      </div>
      <div className="grid grid-cols-3 gap-x-6 gap-y-6 items-start">
        {selectedGoalType.goals &&
          selectedGoalType.goals.map((goal) => {
            const AvatarIcon = getAvatarIcon(goal.avatarIcon);
            return (
              <Button
                onClick={() => {
                  setSelectedGoal(goal);
                }}
                sx={{ textTransform: "none", padding: "0px" }}
                key={String(goal.goal_id)}
              >
                <div className="flex flex-col w-20 self-auto border-2">
                  <div className="bg-secondary rounded-2xl py-4 border-2">
                    <AvatarIcon sx = {{fontSize : "2.25rem"}} />
                  </div>
                  <div className = "font-bold text-m">{goal.goal_name}</div>
                </div>
              </Button>
            );
          })}
      </div>
    </div>
  );
}

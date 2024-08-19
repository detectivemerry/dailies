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
    console.log("selectedGoalType is ehre");
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
      <div className="col-span-4 gap-4">
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
                <div className="flex flex-col w-full">
                  <div className="bg-secondary p-3 rounded-3xl w-">
                    <AvatarIcon />
                  </div>
                  <div>{goal.goal_name}</div>
                </div>
              </Button>
            );
          })}
      </div>
    </div>
  );
}

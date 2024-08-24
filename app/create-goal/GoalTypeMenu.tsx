"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@mui/material";
import TitleHeader from "@/components/header/TitleHeader";
import getAvatarIcon from "./getAvatarIcon";
import GoalList from "./GoalList";
import {GoalType, Goal} from "@/types/model"

interface GoalTypeMenuProps {
  goalTypes: GoalType[];
  setViewGoalTypes: Dispatch<SetStateAction<boolean>>;
  setGoal: Dispatch<SetStateAction<Goal | null>>;
}

export default function GoalTypeMenu({
  goalTypes,
  setViewGoalTypes,
  setGoal,
}: GoalTypeMenuProps) {
  const [goalType, setGoalType] = useState<GoalType | null>(
    null
  );

  return (
    <div className="w-full">
      {goalType ? (
        <>
          <GoalList
            goalType={goalType}
            setGoalType={setGoalType}
            setViewGoalTypes={setViewGoalTypes}
            setGoal={setGoal}
          />
        </>
      ) : (
        <>
          <div>
            <TitleHeader
              title="Goal Type"
              onClick={() => setViewGoalTypes(false)}
            />
          </div>

          <div className="flex flex-col gap-4">
            {Array.isArray(goalTypes) &&
              goalTypes.map((goalType) => {
                const AvatarIcon = getAvatarIcon(goalType.icon);
                return (
                  <Button
                    onClick={() => {
                      setGoalType(goalType);
                    }}
                    sx={{ textTransform: "none", padding: "0px" }}
                    key={String(goalType._id)}
                  >
                    <div className="bg-secondary flex w-full p-3 px-6 gap-3 text-primary font-bold rounded-3xl">
                      <div>
                        <AvatarIcon />
                      </div>
                      <div>{goalType.name}</div>
                    </div>
                  </Button>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

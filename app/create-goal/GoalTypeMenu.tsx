"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@mui/material";
import TitleHeader from "@/components/header/TitleHeader";
import getAvatarIcon from "./getAvatarIcon";
import GoalList from "./GoalList";
import {GoalType, Goal} from "@/types/model"

interface GoalTypeMenuProps {
  goalTypes: GoalType[];
  setSelectGoalTypeSubMenu: Dispatch<SetStateAction<boolean>>;
  setGoal: Dispatch<SetStateAction<string | null>>;
}

export default function GoalTypeMenu({
  goalTypes,
  setSelectGoalTypeSubMenu,
  setGoal,
}: GoalTypeMenuProps) {
  const [selectedGoalType, setSelectedGoalType] = useState<GoalType | null>(
    null
  );

  return (
    <div className="w-full">
      {selectedGoalType ? (
        <>
          <GoalList
            selectedGoalType={selectedGoalType}
            setSelectedGoalType={setSelectedGoalType}
            setGoal={setGoal}
          />
        </>
      ) : (
        <>
          <div>
            <TitleHeader
              title="Goal Type"
              onClick={() => setSelectGoalTypeSubMenu(false)}
            />
          </div>

          <div className="flex flex-col gap-4">
            {Array.isArray(goalTypes) &&
              goalTypes.map((goalType) => {
                const AvatarIcon = getAvatarIcon(goalType.avatarIcon);
                return (
                  <Button
                    onClick={() => {
                      setSelectedGoalType(goalType);
                    }}
                    sx={{ textTransform: "none", padding: "0px" }}
                    key={String(goalType._id)}
                  >
                    <div className="bg-secondary flex w-full p-3 px-6 gap-3 text-primary, font-bold rounded-3xl">
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

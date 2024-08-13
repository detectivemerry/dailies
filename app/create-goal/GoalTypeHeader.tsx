"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Button } from "@mui/material";

interface GoalTypeHeaderProps {
  headerText: string;
  onClick: any;
}

export default function GoalTypeHeader({
  headerText,
  onClick,
}: GoalTypeHeaderProps) {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-start w-screen">
        <Button sx={{ textTransform: "none"}} onClick={handleClick}>
          <div>
            <ChevronLeft sx = {{ fontSize : "2rem"}} />
          </div>
          <div className = "text-lg">Back</div>
        </Button>
      </div>
      <div>
        <div className="text-3xl font-semibold text-main my-2 flex flex-col items-center">
          {headerText}
        </div>
        <div className="border-t w-screen mb-6"></div>
      </div>
    </div>
  );
}

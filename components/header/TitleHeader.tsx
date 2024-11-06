
"use client";

import React from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Button } from "@mui/material";

interface TitleHeaderProps {
  title: string;
  onClick: any;
}

export default function TitleHeader({
  title,
  onClick,
}: TitleHeaderProps) {

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-start w-screen mt-2">
        <Button sx={{ textTransform: "none"}} onClick={handleClick}>
          <div>
            <ChevronLeft sx = {{ fontSize : "2rem"}} />
          </div>
          <div className = "text-lg">Back</div>
        </Button>
      </div>
      <div>
        <div className="text-3xl font-semibold text-main my-2 flex flex-col items-center">
          {title}
        </div>
        <div className="border-t w-screen mb-8"></div>
      </div>
    </div>
  );
}

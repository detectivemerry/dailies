"use client";
import { Settings } from "@mui/icons-material";
import React, { useState } from "react";

interface ProfileTitleHeaderProps {
  username: string;
}

export default function ProfileTitleHeader({
  username,
}: ProfileTitleHeaderProps) {
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  return (
    <>
      <div className="border-b fixed bg-white h-16 w-full lg:w-[24.5rem]">
        <div className=" fixed left-1/2 transform -translate-x-1/2 top-4 w-auto">
          <div className="flex flex-col items-center text-lg text-main">
            {username}
          </div>
        </div>
        <div className="fixed py-4 ml-[24rem] lg:ml-[22.5rem]">
          <div
            onClick={() => {
              setOpenSettings((prev) => !prev);
            }}
          >
            <Settings sx={{ color: "#1D5D9B" }} />
          </div>
        </div>
      </div>
    </>
  );
}

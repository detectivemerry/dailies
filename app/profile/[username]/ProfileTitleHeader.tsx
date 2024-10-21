"use client";
import { Settings } from "@mui/icons-material";
import React, { useState } from "react";

export default function ProfileTitleHeader() {

  const [openSettings, setOpenSettings] = useState<boolean>(false);

  return (
    <>
      <div className="fixed left-1/2 transform -translate-x-1/2 top-4 w-auto">
        <div className="flex flex-col items-center text-lg text-main">
          myusername
        </div>
      </div>
      <div className="border-b py-4 flex justify-end pr-6">
        <div
          onClick={() => {
            setOpenSettings((prev) => !prev);
          }}
        >
          <Settings sx={{ color: "#1D5D9B" }} />
        </div>
      </div>
    </>
  );
}

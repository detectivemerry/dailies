import React, { Dispatch, SetStateAction } from "react";
import { AlertColor } from "@mui/material";

interface ProfileModeMenuProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  setAlert: Dispatch<SetStateAction<Alert>>;
}

type Alert = {
  message: string;
  type: AlertColor;
};

export default function ProfileModeMenu({
  mode,
  setMode,
  setAlert,
}: ProfileModeMenuProps) {
  return (
    <div className="flex">
      <div
        className={`w-2/4 font-bold flex justify-center h-full py-3 text-main ${
          mode === "goals" ? "border-b border-main" : "text-mainDisabled"
        }`}
        onClick={() => {
          setAlert({ message: "", type: "success" });
          setMode("goals");
        }}
      >
        Goals
      </div>
      <div
        className={`w-2/4 font-bold flex justify-center h-full py-3 text-main ${
          mode === "posts" ? "border-b border-main" : "text-mainDisabled"
        }`}
        onClick={() => {
          setAlert({ message: "", type: "success" });
          setMode("posts");
        }}
      >
        Posts
      </div>
    </div>
  );
}

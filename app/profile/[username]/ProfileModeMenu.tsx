import React, { Dispatch, SetStateAction } from "react";

interface ProfileModeMenuProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
export default function ProfileModeMenu({
  mode,
  setMode,
}: ProfileModeMenuProps) {
  return (
    <div className="flex">
      <div
        className={`w-2/4 font-bold flex justify-center h-full py-3 text-main ${
          mode === "goals" ? "border-b border-main" : "text-mainDisabled"
        }`}
        onClick={() => {
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
          setMode("posts");
        }}
      >
        Posts
      </div>
    </div>
  );
}

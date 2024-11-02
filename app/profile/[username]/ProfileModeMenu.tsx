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
    <div className="flex border">
      <div
        className={`w-2/4 font-bold flex justify-center h-full py-3 text-main ${
          mode === "Goals" ? "border-b border-main" : "text-mainDisabled"
        }`}
        onClick={() => {
          setMode("Goals");
        }}
      >
        Goals
      </div>
      <div
        className={`w-2/4 font-bold flex justify-center h-full py-3 text-main ${
          mode === "Posts" ? "border-b border-main" : "text-mainDisabled"
        }`}
        onClick={() => {
          setMode("Posts");
        }}
      >
        Posts
      </div>
    </div>
  );
}

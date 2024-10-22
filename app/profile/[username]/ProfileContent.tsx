"use client";

import { Post, UserGoal } from "@/types/model";
import React, { useState } from "react";
import ProfileModeMenu from "./ProfileModeMenu";

interface ProfileContentProps {
  userGoals: UserGoal[];
  posts: Post[];
}
export default function ProfileContent({
  userGoals,
  posts,
}: ProfileContentProps) {
  const [mode, setMode] = useState<string>("Goals");

  return (
    <div className="flex flex-col">
      <ProfileModeMenu mode = {mode} setMode = {setMode} />

    </div>
  );
}

"use client";

import { Post, UserGoal } from "@/types/model";
import React, { useEffect, useState } from "react";

import ProfileModeMenu from "./ProfileModeMenu";
import PostCard from "@/components/post/PostCard";
import UserGoalCard from "./UserGoalCard";
import ProfileGoalHeader from "./ProfileGoalHeader";
import NoGoals from "./NoGoals";
import NoPosts from "./NoPosts";
import { Alert, AlertColor } from "@mui/material";

interface ProfileContentProps {
  userGoals: UserGoal[];
  posts: Post[];
  type: string | undefined;
  currentProfileUsername: string | undefined;
}

type Alert = {
  message: string;
  type: AlertColor;
};

export default function ProfileContent({
  userGoals,
  posts,
  type,
  currentProfileUsername,
}: ProfileContentProps) {
  const [mode, setMode] = useState<string>(
    !type || type == "goals" ? "goals" : type == "posts" ? "posts" : "goals"
  );
  const [alert, setAlert] = useState<Alert>({ message: "", type: "success" });

  useEffect(() => {
    if (type && (type == "goals" || type == "posts")) {
      setMode(type);
    }
  }, [type]);

  return (
    <div className={`flex flex-col mb-20 h-full`}>
      <ProfileModeMenu mode={mode} setMode={setMode} setAlert={setAlert} />
      {mode === "goals" && <ProfileGoalHeader />}
      {alert.message && (
        <div className="my-1">
          <Alert severity={alert.type}>{alert.message}</Alert>
        </div>
      )}

      {userGoals && mode === "goals" && (
        <div className="flex flex-col gap-3">
          {userGoals.map((userGoal) => (
            <UserGoalCard
              userGoal={userGoal}
              key={String(userGoal._id)}
              setAlert={setAlert}
              currentProfileUsername={currentProfileUsername}
            />
          ))}
        </div>
      )}

      {(!userGoals || userGoals.length === 0) && mode === "goals" && (
        <NoGoals />
      )}

      {posts && mode === "posts" && (
        <div>
          {posts.map((post) => (
            <PostCard post={post} key={String(post._id)} setAlert={setAlert} />
          ))}
        </div>
      )}

      {posts && mode === "posts" && posts.length === 0 && <NoPosts />}
    </div>
  );
}

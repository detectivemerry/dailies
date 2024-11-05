"use client";

import { Post, UserGoal } from "@/types/model";
import React, { useState } from "react";

import ProfileModeMenu from "./ProfileModeMenu";
import PostCard from "@/components/post/PostCard";
import UserGoalCard from "./UserGoalCard";
import ProfileGoalHeader from "./ProfileGoalHeader";
import NoGoals from "./NoGoals";
import NoPosts from "./NoPosts";

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
    <div className={`flex flex-col mb-20 h-full`}>
      <ProfileModeMenu mode={mode} setMode={setMode} />
      {mode === "Goals" && <ProfileGoalHeader />}

      {userGoals && mode === "Goals" && (
        <div className = "flex flex-col gap-3">
          {userGoals.map((userGoal) => (
            <UserGoalCard userGoal={userGoal} key={String(userGoal._id)} />
          ))}
        </div>
      )}

      {!userGoals && mode === "Goals" && 
        <NoGoals />
      }

      {posts && mode === "Posts" && (
        <div>
          {posts.map((post) => (
            <PostCard post={post} key={String(post._id)} />
          ))}
        </div>
      )}

      {
        posts && mode === "Posts" && posts.length === 0 &&
        <NoPosts/>
      }
    </div>
  );
}

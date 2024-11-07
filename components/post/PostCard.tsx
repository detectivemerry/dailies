"use client";
import { Post } from "@/types/model";
import React, { useState, useEffect, MouseEvent } from "react";
import {
  AccessTime,
  CheckCircle,
  Circle,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Replay,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoalTag from "@/components/goal/GoalTag";
import GoalTag from "@/components/goal/GoalTag";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(true);
  const { data: session } = useSession();
  const displayDate = post.editedDateTime
    ? dayjs(post.editedDateTime).format("DD MMM YYYY")
    : dayjs(post.postedDateTime).format("DD MMM YYYY");

  const router = useRouter();

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  //const handleNavigateToCommuntiy = (e: MouseEvent<HTMLDivElement>) => {
  //e.preventDefault();
  //const target = e.target as HTMLDivElement;
  //router.push(`/community/${target.innerHTML}`);
  //};

  const handleNavigateToEditPost = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push(`/edit-post/${post._id}`);
  };

  const displayTimeLeftForGoal = (): string => {
    if (post.goalEndDate === "") return "Lifelong goal";

    const startDate = dayjs(post.goalStartDate);
    const endDate = dayjs(post.goalEndDate);
    const diffInDays = startDate.diff(endDate, "days") * -1;
    if (diffInDays < 0) return `finished`;
    if (diffInDays < 30) return `${diffInDays} days left`;
    const diffInMonths = startDate.diff(endDate, "months") * -1;
    if (diffInMonths < 12) return `${diffInMonths} months left`;
    const diffInYears = startDate.diff(endDate, "years") * -1;
    return `${diffInYears} years left`;
  };

  const computeTimeSincePosted = (time: Dayjs): string => {
    const now = dayjs();
    const diffInMinutes = now.diff(time, "minute");
    const diffInHours = now.diff(time, "hour");
    const diffInDays = now.diff(time, "day");

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`; // e.g., "42m"
    } else if (diffInHours < 24) {
      return `${diffInHours}h`; // e.g., "3h"
    } else {
      return `${diffInDays}d`; // e.g., "2d"
    }
  };

  return (
    <div className="flex flex-col px-2 border-b text-sm">
      <div className="flex justify-between px-2">
        <div className="flex gap-2 my-3">
          <Link href={`/profile/${post.username}`} className="no-underline">
            <div className="font-bold text-main">{post.username}</div>
          </Link>
          <GoalTag goalName={post.goalName} />
        </div>
        {session?.user.username === post.username && (
          <div className="px-3 py-2" onClick={handleNavigateToEditPost}>
            <Edit sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
          </div>
        )}
      </div>
      <div onClick={handleExpand} className="flex justify-center">
        {post.imageUrl ? (
          <>
            <img src={post.imageUrl} className="max-h-[40vh]" />
          </>
        ) : (
          <>
            <div className="my-3"></div>
          </>
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex pt-3 px-3" onClick={handleExpand}>
            <div className="text-main">Goal: {post.userGoalName}</div>
            <div className={`${expanded ? "" : "truncate"} px-2`}>
              {post.caption}
            </div>
          </div>
          {!expanded && (
            <>
              <div className="flex flex-col gap-3 m-3 mb-0 p-3 pb-4 rounded-xl">
                <Link
                  href={`/profile/${post.username}`}
                  className="no-underline"
                >
                  <div className="text-main">Goal: {post.userGoalName}</div>
                </Link>
              </div>
              <div className="flex justify-center m-3" onClick={handleExpand}>
                <KeyboardArrowDown
                  sx={{ fontSize: "1.75rem", color: "#98aacd" }}
                />
              </div>
            </>
          )}
          {expanded && (
            <>
              <div className="flex flex-col gap-3 m-3 mb-0 p-3 pb-4 rounded-xl">
                <Link
                  href={`/profile/${post.username}`}
                  className="no-underline"
                >
                  <div className="text-main">Goal: {post.userGoalName}</div>
                </Link>
                <div className="flex gap-3">
                  <div className="bg-lightGray rounded-2xl px-3 flex gap-1">
                    <div>
                      {displayTimeLeftForGoal() === "finished" ? (
                        <CheckCircle
                          sx={{
                            color: "#1D5D9B",
                            fontSize: "1rem",
                            marginTop: "-3px",
                          }}
                        />
                      ) : post.goalEndDate ? (
                        <AccessTime
                          sx={{
                            color: "#1D5D9B",
                            fontSize: "1rem",
                            marginTop: "-3px",
                          }}
                        />
                      ) : (
                        <Replay
                          sx={{
                            color: "#1D5D9B",
                            fontSize: "1rem",
                            marginTop: "-3px",
                          }}
                        />
                      )}
                    </div>
                    <div>{displayTimeLeftForGoal()}</div>
                  </div>
                  <div className="bg-lightGray rounded-2xl px-3">
                    {post.frequencyCount} times {post.frequencyPeriod}
                  </div>
                </div>
              </div>
              <div className="text-secondaryText pt-3 pl-3">
                {displayDate} {post.editedDateTime ? "(edited)" : ""}
              </div>
              <div className="flex justify-center m-3" onClick={handleExpand}>
                <KeyboardArrowUp
                  sx={{ fontSize: "1.75rem", color: "#98aacd" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { Post } from "@/types/model";
import React, { useState, useEffect, MouseEvent } from "react";
import {
  AccessTime,
  Edit,
  Repeat,
  RepeatOn,
  Replay,
  Timer,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { data: session } = useSession();
  const formattedDate = dayjs(post.postedDateTime).format("DD MMM YYYY");
  const router = useRouter();

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const handleNavigateToProfile = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const target = e.target as HTMLSpanElement;
    router.push(`/profile/${target.innerHTML}`);
  };

  const handleNavigateToCommuntiy = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    router.push(`/community/${target.innerHTML}`);
  };

  const displayTimeLeftForGoal = (): string => {
    if (post.goalEndDate === "") return "Lifelong goal";

    const startDate = dayjs(post.goalStartDate);
    const endDate = dayjs(post.goalEndDate);
    const diffInDays = startDate.diff(endDate, "days") * -1;
    if (diffInDays < 30) return `${diffInDays} days left`;
    const diffInMonths = startDate.diff(endDate, "months") * -1;
    if (diffInMonths < 12) return `${diffInMonths} months left`;
    const diffInYears = startDate.diff(endDate, "years") * -1;
    return `${diffInYears} years left`;
  };

  //useEffect(() => {
  //console.log(post.goalStartDate);
  //console.log(post.goalEndDate);
  //}, []);

  return (
    <div className="flex flex-col px-2">
      <div className="flex justify-between px-2">
        <div className="flex gap-3 my-3">
          <div
            className="font-bold text-main"
            onClick={handleNavigateToProfile}
          >
            {post.username}
          </div>
          <div
            className="bg-secondary rounded-2xl px-3 text-main"
            onClick={handleNavigateToCommuntiy}
          >
            {post.goalName}
          </div>
        </div>
        {session?.user.username === post.username && (
          <div className="px-3 py-2">
            <Edit sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
          </div>
        )}
      </div>
      <div onClick={handleExpand}>
        {post.imageUrl ? (
          <>
            <img src={post.imageUrl} />
          </>
        ) : (
          <>
            <div className="my-3"></div>
          </>
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex" onClick={handleExpand}>
            <span className={`${expanded ? "" : "truncate"} px-2`}>
              <span
                className="font-400 text-main"
                onClick={handleNavigateToProfile}
              >
                {post.username}
              </span>{" "}
              {post.caption}
            </span>
          </div>
          {expanded && (
            <div className="flex gap-3 border-red-200 my-3">
              <div className="bg-lightGray rounded-2xl px-3">
                {post.frequencyCount} times {post.frequencyPeriod}
              </div>
              <div className="bg-lightGray rounded-2xl px-3 flex gap-1">
                <div>
                  {post.goalEndDate ? (
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
            </div>
          )}
        </div>
      </div>
      <div className="text-secondaryText py-2">{formattedDate}</div>
    </div>
  );
}

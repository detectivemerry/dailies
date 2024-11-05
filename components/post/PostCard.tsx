"use client";
import { Post } from "@/types/model";
import React, { useState, useEffect, MouseEvent } from "react";
import { AccessTime, CheckCircle, Edit, Replay } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { encryptData } from "@/app/lib/encryption/encryption";
import Link from "next/link";

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
    const postId = await encryptData(String(post._id));
    router.push(`/edit-post/${postId}`);
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

  return (
    <div className="flex flex-col px-2 border-b">
      <div className="flex justify-between px-2">
        <div className="flex gap-3 my-3">
          <Link href={`/profile/${post.username}`} className="no-underline">
            <div className="font-bold text-main">{post.username}</div>
          </Link>
          <Link href={`/community/${post.goalName}`} className="no-underline">
            <div className="bg-secondary rounded-2xl px-3 text-main">
              {post.goalName}
            </div>
          </Link>
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
          <div className="flex pt-3" onClick={handleExpand}>
            <span className={`${expanded ? "" : "truncate"} px-2`}>
              <Link href={`/profile/${post.username}`} className="no-underline">
                <span className="font-bold text-main">{post.username}</span>{" "}
              </Link>
              {post.caption}
            </span>
          </div>
          {expanded && (
            <div className="flex flex-col gap-3 m-3 mb-0 p-3 pb-4 border border-mainDisabled rounded-xl">
              <Link href = {`/profile/${post.username}`} className = "no-underline">
                <div className="text-main">{post.userGoalName}</div>
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
          )}
        </div>
      </div>
      <div className="text-secondaryText p-2">
        {displayDate} {post.editedDateTime ? "(edited)" : ""}
      </div>
    </div>
  );
}

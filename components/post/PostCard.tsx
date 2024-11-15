"use client";
import { Post } from "@/types/model";
import React, { useState, useEffect, MouseEvent } from "react";
import {
  AccessTime,
  CheckCircle,
  Circle,
  Edit,
  Replay,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoalTag from "@/components/goal/GoalTag";
import { computeTimeLeftForGoal } from "@/app/lib/display/userGoalCardDisplay";
import computeTimeSincePosted from "@/app/lib/display/computeTimeSincePosted";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const displayDate = computeTimeLeftForGoal(
    {endDate : new Date(post.goalEndDate), startDate : new Date(post.goalStartDate)})

  useEffect(()=> {
    if(clickedEdit){
      const intervalId = setInterval(() => {
        setClickedEdit(false)
      },1000)

      return () => clearInterval(intervalId);
    }
  }, [clickedEdit])

  return (
    <div className="flex flex-col px-2 text-xs pb-4 border-t border-gray-150 pt-3">
      <div className="flex justify-between px-3">
        <div className="flex gap-2 my-3">
          <Link href={`/profile/${post.username}`} className="no-underline">
            <div className="font-bold text-main">{post.username}</div>
          </Link>
          <GoalTag goalName={post.goalName} />
          <div className = "flex gap-1 text-secondaryText justify-center items-center">
            <Circle sx = {{ fontSize : "0.25rem", color : "#838383"}}/>
            {computeTimeSincePosted(dayjs(post.postedDateTime))}
          </div>
        </div>
        {session?.user.username === post.username && (
          <div 
          className={`${clickedEdit && 'bg-lightGray'} my-[7px] pt-[2px] rounded px-2`}
          onClick={() => {
              setClickedEdit(true);
              router.push(`/edit-post/${post._id}`);
          }}>
            <Edit sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
          </div>
        )}
      </div>
      <div onClick={handleExpand} className="flex justify-center border-gray-150 border mx-3">
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
          <div className="flex flex-col" onClick={handleExpand}>
            <div className="text-main p-3">Goal: {post.userGoalName}</div>
            {expanded && (
                <div className="flex gap-3 px-3 pb-3 justify-center">
                  <div className="bg-lightGray rounded-2xl px-9 flex gap-1 py-[2px]">
                    <div>
                      {/* {displayTimeLeftForGoal() === "finished" ? ( */}
                      {displayDate === "finished" ? (
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
                    <div>{displayDate}</div>
                  </div>
                  <div className="bg-lightGray rounded-2xl px-9 py-[2px]">
                    {post.frequencyCount} times {post.frequencyPeriod}
                  </div>
                </div>
            )}
            <div className={`px-3 ${expanded ? "" : "truncate"}`}>
              {post.caption}
            </div>
            <div className="flex justify-end text-main px-3">
              {expanded ? "see less" : "see more"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

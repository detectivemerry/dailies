"use client";
import { Post } from "@/types/model";
import React, { useState, useEffect } from "react";
import { Edit, History, Timer, Timer3Rounded } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { data: session } = useSession();
  const formattedDate = dayjs(post.postedDateTime).format("DD MMM YYYY")

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    console.log(post.imageUrl);
  }, []);

  return (
    <div className="flex flex-col px-2">
      <div className="flex justify-between px-2">
        <div className="flex gap-3 my-3">
          <div className="font-bold text-main">{post.username}</div>
          <div className="bg-secondary rounded-2xl px-3 text-main">
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
        <img src={post.imageUrl} />
      </div>
      <div>
        <div className="flex flex-col">
          <div className = "flex" onClick = {handleExpand}>
            {/* <span className="font-400 text-main px-1"> {post.username} </span>
            <span className={`${expanded ? "" : "truncate"}`}>
              {post.caption}
            </span> */}
            <span className={`${expanded ? "" : "truncate"} px-2`} >
              <span className = "font-400 text-main">{post.username}</span>{" "}{post.caption}
            </span>
          </div>
          {expanded && (
            <div className="flex gap-3 border-red-200 my-3">
              <div className="bg-lightGray rounded-2xl px-3">
                {post.frequencyCount} times {post.frequencyPeriod}
              </div>
              <div className="bg-lightGray rounded-2xl px-3 flex gap-1">
                <div>
                  <Timer sx={{ color: "#1D5D9B", fontSize: "1rem" }} />
                </div>
                <div>3 months left</div>
              </div>
            </div>
          )}
        </div>
        {/* {expanded ? (
          <div className="flex flex-col">
            <div>
              <div className = "font-400 text-main px-1"> {post.username} </div>
              <div>{post.caption}</div>
            </div>
            <div className="flex">
              <div>3 times per week</div>
              <div>3 month left</div>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div> username </div>
            <div>{post.caption}</div>
            <div onClick={handleExpand}>more</div>
          </div>
        )} */}
      </div>
      <div className = "text-secondaryText py-2">{formattedDate}</div>
    </div>
  );
}

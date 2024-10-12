"use client";
import { Post } from "@/types/model";
import React, { useState } from "react";
import { Edit } from "@mui/icons-material"

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [expanded, setExpended] = useState(false);

  const handleExpand = () => {
    setExpended((prev) => !prev)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex">
          <div>username</div>
          <div>goal name</div>
        </div>
        <div>
          <Edit/>
        </div>
      </div>
      <div onClick = {handleExpand}>
        <img src={post.imageUrl}/>
      </div>
      <div>
        {expanded ?
        <div className = "flex flex-col">
          <div>
            <div> username </div>
            <div>{post.caption}</div>
          </div>
          <div className = "flex">
            <div>3 times per week</div>
            <div>3 month left</div>
          </div>
        </div>
        :
        <div className = "flex">
          <div> username </div>
          <div>{post.caption}</div>
          <div onClick = {handleExpand}>more</div>
        </div>
        }
      </div>
      <div>
        {post.postedDateTime}
      </div>
    </div>
  );
}

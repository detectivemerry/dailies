"use client"

import React from "react";

import { Post } from "@/types/model";
import PostCard from "@/components/post/PostCard";
import SectionHeader from "@/components/header/SectionHeader";
import NoSubscribed from "./NoSubscribed";
import { Button } from "@mui/material";

interface HomeContentProps {
  subscribedPosts: Post[];
}

export default function HomeContent({ subscribedPosts }: HomeContentProps) {
  return (
    <div className="flex flex-col">
      <div className="-mb-4">
        <SectionHeader>Your Communities</SectionHeader>
      </div>
      <div>
        {subscribedPosts && subscribedPosts.length > 0 ?
          subscribedPosts.map((post) => (
            <PostCard post={post} key={String(post._id)} />
          )) :
          <NoSubscribed/>
        }
      </div>
    </div>
  );
}

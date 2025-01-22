"use client"

import React from "react";

import { Post } from "@/types/model";
import PostCard from "@/components/post/PostCard";
import SectionHeader from "@/components/header/SectionHeader";
import NoSubscribed from "./NoSubscribed";
import { Button } from "@mui/material";
import sendCommunityActivityNotifications from "../lib/actions/notifications/communityActivityNotifications";

interface HomeContentProps {
  subscribedPosts: Post[];
  email : string;
}

export default function HomeContent({ subscribedPosts, email }: HomeContentProps) {
  return (
    <div className="flex flex-col">
      <div className="-mb-4">
        <SectionHeader>Your Communities</SectionHeader>
      </div>
      <div>
        <Button
          onClick = {() => {
            sendCommunityActivityNotifications(email)
          }}
        >
         SEND COMMUNITY NOTIFICATION 
        </Button>
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

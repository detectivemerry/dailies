"use client";

import React, { useEffect, useState } from "react";

import { Post, Goal, UserSubscribedCommunity } from "@/types/model";
import CommunityHeader from "./CommunityHeader";
import PostCard from "@/components/post/PostCard";

interface CommunityContentProps {
  posts: Post[];
  community: Goal | undefined;
  subscribedCommunities: Array<UserSubscribedCommunity>;
}

export default function CommunityContent({
  posts,
  community,
  subscribedCommunities,
}: CommunityContentProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full">
      <CommunityHeader
        community={community}
        subscribedCommunities={subscribedCommunities}
        setErrorMessage={setErrorMessage}
        subscribed={subscribed}
        setSubscribed={setSubscribed}
      />
      <div className = "mb-20">
        {posts &&
          posts.map((post) => <PostCard post={post} key={String(post._id)} />)}
      </div>
    </div>
  );
}

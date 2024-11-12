"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Post, Goal, UserSubscribedCommunity } from "@/types/model";
import CommunityHeader from "./CommunityHeader";

interface CommunityContentProps {
  posts: Post[];
  community: Goal | undefined;
  subscribedCommunities : Array<UserSubscribedCommunity>;
}

export default function CommunityContent({
  posts,
  community,
  subscribedCommunities 
}: CommunityContentProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const { data: session, status, update } = useSession();

  return (
    <div>
      <CommunityHeader
        community={community}
        subscribedCommunities ={subscribedCommunities}
        setErrorMessage={setErrorMessage}
        subscribed = {subscribed}
        setSubscribed = {setSubscribed}
      />
    </div>
  );
}

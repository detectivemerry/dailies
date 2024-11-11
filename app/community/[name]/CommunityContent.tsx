"use client"

import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";

import { Post, UserGoal, Goal } from "@/types/model";
import CommunityHeader from './CommunityHeader';
import { ConstructionOutlined } from '@mui/icons-material';

interface CommunityContentProps {
    posts : Post[];
    community : Goal | undefined;
}

export default function CommunityContent({posts, community} : CommunityContentProps) {

  const { data: session } = useSession();

  return (
    <div>
        <CommunityHeader community = {community} subscribedCommunities = {session?.user.subscribedCommunities}/>
    </div>
  )
}

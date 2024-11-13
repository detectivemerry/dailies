import React from "react";
import { getServerSession } from "next-auth";
import { notFound } from 'next/navigation'

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import CommunityContent from "./CommunityContent";
import { Goal, GoalType } from "@/types/model";

interface CommunityPageProps {
  params: {
    name: string;
  };
}
export default async function CommunityPage({ params }: CommunityPageProps) {
  const communityName = decodeURI(params.name);

  const postsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts/community`,
    {
      method: "GET",
      headers: { "community-name": communityName },
      cache: "no-store",
    }
  );

  const { data: posts } = await postsResponse.json();

  const goalTypesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/goalTypes`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const { data: goalTypesData } = await goalTypesResponse.json();
  const goalTypes: Goal[] = goalTypesData.reduce(
    (acc: Goal[], goalType: GoalType) => acc.concat(goalType.goals),
    []
  );
  const community = goalTypes.find((goalType: Goal) => {
    return goalType.name === communityName;
  });

  const session = await getServerSession(authOptions);

  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method : "GET",
    headers : {"username" : session?.user.username},
    cache: "no-store",
  })

  const { data : userData }  = await userResponse.json();

  if(!userResponse.ok){
    notFound();
  }

  return (
    <div className="flex flex-col w-screen lg:w-[24.5rem]">
      <CommunityContent posts={posts} community={community} subscribedCommunities ={userData?.subscribedCommunities} />
    </div>
  );
}

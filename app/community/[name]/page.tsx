import React from "react";
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

  return (
    <div className="flex flex-col w-screen lg:w-[24.5rem]">
      <CommunityContent posts={posts} community={community} />
    </div>
  );
}

import React from 'react';
import { Post, GoalType, Goal } from "@/types/model";
import GoalTag from "@/components/goal/GoalTag";
import SectionHeader from "@/components/header/SectionHeader";
import PostCard from "@/components/post/PostCard";

export default async function page() {

  const goalsTypesResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goalTypes/`, {
    method : "GET",
    headers : {},
    cache: "no-store",
  })

  const { data : goalTypes } = await goalsTypesResponse.json();
  const goals:Goal[] = goalTypes.reduce((acc:Goal[], goalType:GoalType) => acc.concat(goalType.goals), []);
  // Sort goals based on no_of_members and take top 10
  goals.sort((a:Goal, b:Goal) => b.no_of_members - a.no_of_members).splice(5); 
  
  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/`, {
    method: "GET",
    headers : {},
    cache: "no-store",
  });

  const { data : posts } = await postsResponse.json();

  return (
    <div className="flex flex-col w-screen lg:w-[24.5rem]">
      <div className = "mb-[4.5rem]">
      <SectionHeader>Popular Communities</SectionHeader>
      </div>
      <div className="flex overflow-x-auto gap-4">
        {goals.map((goal:Goal) => (
          <GoalTag goalName={goal.name} key={String(goal._id)} />
        ))}
      </div>
      <SectionHeader>Recent Posts</SectionHeader>
      {posts.map((post:Post) => (
        <PostCard post={post} key={String(post._id)} />
      ))}
    </div>
  )
}

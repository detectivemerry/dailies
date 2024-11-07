import React from 'react';
import { Post, GoalType, Goal } from "@/types/model";
import GoalTag from "@/components/goal/GoalTag";
import SectionHeader from "@/components/header/SectionHeader";
import PostCard from "@/components/post/PostCard";

export default async function page() {

  const goalsTypesResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goals/`, {
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
    <div>page</div>
  )
}

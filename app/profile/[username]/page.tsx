import React from 'react'
import ProfileTitleHeader from "./ProfileTitleHeader"
import ProfileContent from './ProfileContent'

interface ProfilePageProps {
  params : {
  username : string
  }
}

export default async function page({ params } : ProfilePageProps) {
  const userGoalsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goals/user`, {
    method: "GET",
    headers : {"username" : params.username},
    cache: "no-store",
  });

  const { data : userGoalsData } = await userGoalsResponse.json();

  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/user`, {
    method: "GET",
    headers : {"username" : params.username},
    cache: "no-store",
  });

  const { data : posts } = await postsResponse.json();
  posts.reverse();

  return (
    <div className = "flex flex-col w-screen lg:w-[24.5rem]">
      <div>
        <ProfileTitleHeader username = {params.username}/>
      </div>
      <div>
        <ProfileContent userGoals = {userGoalsData?.userGoals} posts = {posts} />
      </div>
    </div>
  )
}

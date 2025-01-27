import React from 'react'
import ProfileTitleHeader from "./ProfileTitleHeader"
import ProfileContent from './ProfileContent'
import { notFound } from 'next/navigation'

interface ProfilePageProps {
  params : {
  username : string
  }
  searchParams?: { [key: string]: string | undefined }
}

export default async function page({ params, searchParams } : ProfilePageProps) {

  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method : "GET",
    headers : {"username" : params.username},
    cache: "no-store",
  })

  if(!userResponse.ok){
    notFound();
  }

  const { data : userData } = await userResponse.json();
  const userGoals = userData?.goals.reverse();

  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/user`, {
    method: "GET",
    headers : {"username" : params.username},
    cache: "no-store",
  });

  const { data : posts } = await postsResponse.json();
  posts.reverse();

  return (
    <div className = "flex flex-col w-screen lg:w-[24.5rem] text-xs">
      <div className = "mb-16">
        <ProfileTitleHeader username = {params.username}/>
      </div>
      <div>
        <ProfileContent userGoals = {userGoals} posts = {posts} type = {searchParams?.type} />
      </div>
    </div>
  )
}

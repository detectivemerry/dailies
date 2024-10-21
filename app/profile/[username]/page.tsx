import React from 'react'
import ProfileTitleHeader from "./ProfileTitleHeader"
import ProfileContent from './ProfileContent'

interface ProfilePageProps {
  params : {
  username : string
  }
}

export default async function page({ params } : ProfilePageProps) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${params.username}`, {
    method: "GET",
    cache: "no-store",
  });

  const { data } = await response.json();
  return (
    <div className = "flex flex-col w-screen lg:w-[24.5rem]">
      <div>
        <ProfileTitleHeader/>
      </div>
      <div>
        <ProfileContent />
      </div>
    </div>
  )
}

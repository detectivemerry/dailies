import { Post, UserGoal } from '@/types/model'
import React from 'react'

interface ProfileContentProps{
  userGoals : UserGoal[],
  posts : Post[]
}
export default function ProfileContent({ userGoals, posts } : ProfileContentProps) {
  return (
    <div>ProfileContent</div>
  )
}

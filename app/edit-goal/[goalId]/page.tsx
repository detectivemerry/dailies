import React from 'react'
import EditGoalForm from './EditGoalForm'

interface EditGoalPageProps {
  params : {
    goalId : string
  }
}

export default async function page({params} : EditGoalPageProps) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goal/user`, {
    method : "GET",
    headers : {"goalId" : params.goalId},
    cache : "no-store",
  })

  const {data : userGoal} = await response.json();

  return (
    <div className = "w-screen lg:w-[24.5rem]">
        <EditGoalForm userGoal = {userGoal}/>
    </div>
  )
}

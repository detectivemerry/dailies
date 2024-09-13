import React from "react";
import CreateGoal from "./CreateGoal";

async function getGoalTypes(){
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goalTypes`, { method : "GET", cache : "no-store"});
  const goalTypes = await response.json();
  if(goalTypes.data){
    return goalTypes.data;
  }
} 

export default async function page() {
  const goalTypes = await getGoalTypes();
  return (
    <div className="flex flex-col items-center mx-8">
      <div className = "w-full lg:w-3/12">
        <CreateGoal goalTypes = {goalTypes}/>
      </div>
    </div>
  );
}

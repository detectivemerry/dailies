import React from "react";
import CreateGoalForm from "./CreateGoalForm";

async function getGoalTypes() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goalTypes`, {
    method: "GET",
    cache: "no-store",
  });
  const goalTypes = await response.json();
  if (goalTypes.data) {
    return goalTypes.data;
  }
}

export default async function page() {
  const goalTypes = await getGoalTypes();
  return (
    <div className="w-full lg:w-3/12">
      <CreateGoalForm goalTypes={goalTypes} />
    </div>
  );
}

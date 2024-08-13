import React from "react";

export default function CreateGoalHeader() {
  return (
    <div className = "flex flex-col items-center">
      <div className="text-3xl font-semibold text-main mt-20">
        Create a goal
      </div>
      <div className="text-secondaryText text-center mb-10">
        <div>Already have a goal in mind?</div>
        <div>Create a goal with us now!</div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";

interface GoalTagProps {
  goalName : string;
  key? : string;
}

export default function GoalTag({ goalName, key } : GoalTagProps ) {
  return (
    <Link href={`/community/${encodeURI(goalName)}`} className="no-underline">
      <div className="bg-secondary rounded-2xl px-3 text-main text-sm text-nowrap overflow-hidden">
        {goalName}
      </div>
    </Link>
  );
}
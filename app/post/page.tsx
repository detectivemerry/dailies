import React from "react";
import PostForm from "./PostForm";
import { headers } from "next/headers";

export default async function page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method: "GET",
    headers: headers(),
    cache: "no-store",
  });
  const { data } = await response.json();

  return (
    <>
      {data && (
        <div className="w-screen lg:w-[24.5rem]">
          <PostForm userGoals={data.goals} username = {data.username} />
        </div>
      )}
    </>
  );
}

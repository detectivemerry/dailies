import React from "react";
import PostForm from "./PostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function page() {
  const session = await getServerSession(authOptions)
  const userGoalsResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/goals/user`, {
    method: "GET",
    headers : {"username" : session?.user.username},
    cache: "no-store",
  });

  const { data : userGoalsData } = await userGoalsResponse.json();

  return (
    <>
      <div className="w-screen lg:w-[24.5rem]">
        <PostForm userGoals = {userGoalsData?.goals} />
      </div>
    </>
  );
}

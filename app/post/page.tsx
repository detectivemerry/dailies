import React from "react";
import PostForm from "./PostForm";

const getUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();
  console.log("heyo we be here")
  console.log(result)
};

export default async function page() {
  const userGoals = await getUsers();

  return (
    <div className="w-screen lg:w-[24.5rem]">
      <PostForm userGoals={userGoals} />
    </div>
  );
}

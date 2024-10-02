import React from "react";
import PostForm from "./PostForm";

const getUserGoals = async () => {

}

export default async function page() {
  
  const userGoals = await getUserGoals();

  return (
    <div className = "w-screen md:w-[24.5rem]">
      <PostForm userGoals = {userGoals} />
    </div>
  );
}

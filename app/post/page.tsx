import React from "react";
import PostForm from "./PostForm";

const getUserGoals = async () => {

}

export default async function page() {
  
  const userGoals = await getUserGoals();

  return (
    <>
      <PostForm userGoals = {userGoals} />
    </>
  );
}

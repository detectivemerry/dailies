"use client";
import { Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

export default function CreateGoalButton() {
  const router = useRouter();
  
  const handleCreateGoal = () => {
    router.push('/create-goal')
  };
  return <Button onClick = {handleCreateGoal}>Click here to add goals</Button>;
}

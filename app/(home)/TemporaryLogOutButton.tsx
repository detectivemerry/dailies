"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function TemporaryLogOutButton() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push('/login')
  };
  return <Button onClick={handleSignOut}>Sign out</Button>;
}

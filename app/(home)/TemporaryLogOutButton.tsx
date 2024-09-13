"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function TemporaryLogOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({redirect : true, callbackUrl : `${process.env.NEXT_PUBLIC_URL}login`});
  };
  return <Button onClick={handleSignOut}>Sign out</Button>;
}

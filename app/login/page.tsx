"use client"

import React from "react";
import { Button, TextField } from "@mui/material";
import Logo from "@/components/Logo";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function Login() {

  const handleLogin = () => {
    console.log("handling login")
  }
  return (
    <div className="flex flex-col items-center my-20 gap-4">
      <div className = "mb-20">
        <Logo />
      </div>
      <div>
        <TextField label="Username" variant="standard" sx = {{ width : "20rem"}}/>
      </div>
      <div className = "flex flex-col">
        <div className = "pb-2">
          <TextField label="Password" variant="standard" type = "password" sx = {{ width : "20rem"}}/>
        </div>
        <div className = "text-right text-sm">
          <Link href = "/register">
            Forget password?
          </Link>
        </div>

      </div>
      <div className = "flex flex-col items-center mt-10 gap-2">
        <div>
          <PrimaryButton text = "login" onClick = {handleLogin}/>
        </div>
        <div className = "text-sm">
          <Link href = "/register">
            Or create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}

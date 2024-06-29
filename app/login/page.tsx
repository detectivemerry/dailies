import React from "react";
import Logo from "@/components/Logo";
import LoginForm from "./LoginForm";

export default function Login() {

  return (
    <div className="flex flex-col items-center my-20 gap-4">
      <div className = "mb-20">
        <Logo />
      </div>
      <LoginForm/>
    </div>
  );

}

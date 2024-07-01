"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { TextField } from "@mui/material";
import { signIn } from "next-auth/react";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    //console.log(data);
    const result = await signIn('credentials', {email : data.username, password : data.password});
    console.log("result")
    console.log(result)
    if(result?.ok)
      console.log("result is ok")
    else
      console.log("result is not ok")

    //reset({
      //username: "",
      //password: "",
    //});
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="Username"
          variant="standard"
          sx={{ width: "20rem" }}
          className = "input-field" {...register("username")}
          required
        />
      </div>
      <div className="flex flex-col">
        <div className="pb-2">
          <TextField
            label="Password"
            variant="standard"
            type="password"
            sx={{ width: "20rem" }}
            className = "input-field" {...register("password")}
            required
          />
        </div>
        <div className="text-right text-sm">
          <Link href="/register">Forget password?</Link>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 gap-2">
        <div>
          <PrimaryButton text="login"/>
        </div>
        <div className="text-sm">
          <Link href="/register">Or create a new account</Link>
        </div>
      </div>
    </form>
  );
}

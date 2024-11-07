"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { TextField, Alert } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Message from "@/app/lib/message/Message";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPending(true);
    setErrorMessage("");
    
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.ok) router.push("/");
    else {
      setPending(false);
      setErrorMessage(Message.Error.InvalidCredentials);
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-80 mb-4">
        {Boolean(errorMessage) && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
      </div>
      <div>
        <TextField
          label="Email"
          variant="standard"
          sx={{ width: "20rem" }}
          className="input-field"
          {...register("email")}
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
            className="input-field"
            {...register("password")}
            required
          />
        </div>
        <div className="text-right text-sm">
          <Link href="/register">Forget password?</Link>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 gap-2">
        <div>
          <PrimaryButton text="Login" pending={pending} />
        </div>
        <div className="text-sm">
          <Link href="/register">Or create a new account</Link>
        </div>
      </div>
    </form>
  );
}

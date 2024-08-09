"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { TextField, Alert, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";

import { useRouter } from "next/navigation";
import Message from "@/app/lib/message/Message";

type Inputs = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorMessage("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) router.push(`/register/create-goal`);
      else {
        const result = await response.json();
        setErrorMessage(result.message);
      }
    } catch (error) {}
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  //<div className="flex flex-col items-center mt-10 gap-2">
  //<div>
  //<PrimaryButton text="Continue" />
  //</div>
  //</div>
  return (
    <>
      <div className="w-80 mb-4">
        {Boolean(errorMessage) && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="">
            <TextField
              label="First name"
              variant="standard"
              sx={{ width: "20rem" }}
              className="input-field"
              {...register("firstName", {
                required: Message.Error.RequiredField,
                maxLength: {
                  value: 50,
                  message: Message.Error.Max50Characters,
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: Message.Error.LettersOnly,
                },
              })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
          </div>
          <div className="">
            <TextField
              label="Last name"
              variant="standard"
              sx={{ width: "20rem" }}
              className="input-field"
              {...register("lastName", {
                required: Message.Error.RequiredField,
                maxLength: {
                  value: 50,
                  message: Message.Error.Max50Characters,
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: Message.Error.LettersOnly,
                },
              })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
          </div>
          <div className="">
            <TextField
              label="Username"
              variant="standard"
              sx={{ width: "20rem" }}
              className="input-field"
              {...register("username", {
                required: Message.Error.RequiredField,
                minLength: { value: 6, message: Message.Error.Min6Characters },
                maxLength: {
                  value: 50,
                  message: Message.Error.Max50Characters,
                },
                pattern: {
                  value: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>~`\-=_+;'\[\]\\\/]+$/,
                  message: Message.Error.AlphaNumericAndSpecialOnly,
                },
              })}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
          </div>
          <div className="">
            <TextField
              label="Email"
              variant="standard"
              sx={{ width: "20rem" }}
              className="input-field"
              {...register("email", {
                required: Message.Error.RequiredField,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: Message.Error.EmailOnly,
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type={showPassword ? "" : "password"}
              variant="standard"
              sx={{ width: "20rem" }}
              className="input-field"
              {...register("password", {
                minLength: { value: 8, message: Message.Error.Min8Characters },
                maxLength: {
                  value: 50,
                  message: Message.Error.Max50Characters,
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: Message.Error.InvalidPassword,
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </div>
        </div>

        <div className="mb-20 fixed bottom-0 flex justify-center h-min-screen">
          <PrimaryButton text="continue" />
        </div>
      </form>
    </>
  );
}

"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import {
  Select,
  MenuItem,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import Message from "@/app/lib/message/Message";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PrimaryButton from "@/components/buttons/PrimaryButton";

type Inputs = {
  goalName: string;
  goalType: string;
  goalPeriod: string;
  email: string;
  password: string;
};

export default function CreateGoal({}) {
  const searchParams = useSearchParams();
  const fromRegister = searchParams.get("fromRegister");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className = "w-full">
        <TextField
          label="Goal name"
          variant="standard"
          className="input-field"
          {...register("goalName", {
            required: Message.Error.RequiredField,
            maxLength: {
              value: 50,
              message: Message.Error.Max50Characters,
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/i,
              message: Message.Error.AlphaNumericOnly,
            },
          })}
          error={Boolean(errors.goalName)}
          helperText={errors.goalName?.message}
          fullWidth
        />
      </div>
      <div className = "m-4">
        <SecondaryButton text="Select goal type" />
      </div>
      <div className="flex flex-col w-full">
        <div className = "text-secondaryText mb-3">Goal Period</div>
        <div className = "flex gap-4 justify-center">
          <div className="w-20">
            <TextField label="Frequency" variant="standard" fullWidth />
          </div>
          <div className="flex items-end">
            <Select defaultValue={"per day"}>
              <MenuItem value="per day">per day</MenuItem>
              <MenuItem value="per week">per week</MenuItem>
              <MenuItem value="per month">per month</MenuItem>
              <MenuItem value="per year">per year</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <div className = "w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Start Date" sx = {{ width : "100%"}}/>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className = "w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="End Date (optional)" sx = {{ width : "100%"}} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="mb-20 fixed bottom-0 flex justify-center h-min-screen">
        <PrimaryButton text="Create" />
      </div>
    </div>
  );
}

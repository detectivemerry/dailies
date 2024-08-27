"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Select, MenuItem, TextField } from "@mui/material";
import Message from "@/app/lib/message/Message";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GoalTypeMenu from "./GoalTypeMenu";
import { GoalType, Goal } from "@/types/model";

type Inputs = {
  goalName: string;
  goalType: string;
  frequencyCount: number;
  frequencyPeriod: string;
  startDate: Dayjs;
  endDate: Dayjs;
};

interface CreateGoalProps {
  goalTypes: GoalType[];
}

export default function CreateGoal({ goalTypes }: CreateGoalProps) {
  const searchParams = useSearchParams();
  const fromRegister = searchParams.get("fromRegister");
  const [viewGoalTypes, setViewGoalTypes] = useState<boolean>(false);
  const [goal, setGoal] = useState<Goal | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const response = await fetch("/api/users/", { method : "PATCH"});
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-6">
        {viewGoalTypes ? (
          <>
            <GoalTypeMenu
              goalTypes={goalTypes}
              setViewGoalTypes={setViewGoalTypes}
              setGoal={setGoal}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-semibold text-main mt-20">
                Create a goal
              </div>
              <div className="text-secondaryText text-center mb-10">
                <div>Already have a goal in mind?</div>
                <div>Create a goal with us now!</div>
              </div>
            </div>
            <div className="w-full">
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
                    value: /^[A-Za-z0-9 ]+$/i,
                    message: Message.Error.AlphaNumericOnly,
                  },
                })}
                error={Boolean(errors.goalName)}
                helperText={errors.goalName?.message}
                fullWidth
              />
            </div>
            <div className="m-4">
              <SecondaryButton
                text={goal ? goal.name : "Select Goal Type"}
                onClick={() => {
                  setViewGoalTypes(true);
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="text-secondaryText mb-3">Goal Period</div>
              <div className="flex gap-4 justify-center">
                <div className="w-20">
                  <TextField
                    label="Frequency"
                    variant="standard"
                    fullWidth
                    {...register("frequencyCount", {
                      required: Message.Error.RequiredField,
                      pattern: {
                        value: /^[A-Za-z0-9]+$/i,
                        message: Message.Error.NumbersOnly,
                      },
                      maxLength: {
                        value: 366,
                        message: Message.Error.Max366Value,
                      },
                    })}
                  />
                </div>
                <div className="flex items-end">
                  <Select
                    defaultValue={"per day"}
                    {...register("frequencyPeriod", {
                      required: Message.Error.RequiredField,
                    })}
                  >
                    <MenuItem value="per day">per day</MenuItem>
                    <MenuItem value="per week">per week</MenuItem>
                    <MenuItem value="per month">per month</MenuItem>
                    <MenuItem value="per year">per year</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  sx={{ width: "100%" }}
                  views = {["year", "month", "day"]}
                  format = "dd/mm/YYYY"
                  defaultValue={dayjs()}
                  disablePast
                  {...register("startDate", {
                    required: Message.Error.RequiredField,
                  })}
                />
                <DatePicker
                  label="End Date (optional)"
                  format="DD-MM-YYYY"
                  sx={{ width: "100%" }}
                  disablePast
                  {...register("endDate")}
                />
              </LocalizationProvider>
            </div>
            <div className="mb-20 fixed bottom-0 flex justify-center h-min-screen">
              <PrimaryButton text="Create" />
            </div>
          </>
        )}
      </div>
    </form>
  );
}

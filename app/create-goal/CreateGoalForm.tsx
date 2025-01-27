"use client";
import React, { BaseSyntheticEvent, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Select, MenuItem, TextField, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ObjectId } from "mongodb";
import { useSession } from "next-auth/react";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import GoalTypeMenu from "./GoalTypeMenu";
import { GoalType, Goal, Post } from "@/types/model";
import Message from "@/app/lib/message/Message";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import AlertDialog from "@/components/dialogs/AlertDialog";
import Link from "next/link";
import { Info } from "@mui/icons-material";
import revalidatePage from "../lib/actions/revalidatePage/revalidatePage";

export type CreateGoalInputs = {
  name: string;
  goalName: string;
  frequencyCount: number;
  frequencyPeriod: string;
  startDateObj: Dayjs | null;
  endDateObj: Dayjs | null;
  startDate: string;
  endDate: string;
  goalId: ObjectId;
  inactive: boolean;
  posts: Post[];
  streak: number;
  timesPostedCurrentPeriod: number;
  startOfCurrentPeriod: string;
  endOfCurrentPeriod: string;
  milestoneReached : number;
};

interface CreateGoalProps {
  goalTypes: GoalType[];
}

export default function CreateGoalForm({ goalTypes }: CreateGoalProps) {
  const searchParams = useSearchParams();
  const fromRegister = searchParams.get("fromRegister");
  const [viewGoalTypes, setViewGoalTypes] = useState<boolean>(false);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [startDateObj, setStartDateObj] = useState<Dayjs | null>(dayjs());
  const [endDateObj, setEndDateObj] = useState<Dayjs | null>(null);
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    message: "",
  });
  const [isGoalCreated, setIsGoalCreated] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const { data: session } = useSession();
  const [readMore, setReadMore] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<CreateGoalInputs>();

  const onSubmit: SubmitHandler<CreateGoalInputs> = async (data, e ? :BaseSyntheticEvent) => {
    setAlertMessage({ error: false, message: "" });
    
    e?.preventDefault();

    if (goal != null) {
      data.goalId = goal._id;
      data.goalName = goal.name;
    }
    let startDateStr = "";
    let endDateStr = "";

    if (
      data.startDateObj &&
      data.endDateObj &&
      data.startDateObj > data.endDateObj
    ) {
      setAlertMessage({
        error: true,
        message: Message.Error.EndDateBeforeStartDate,
      });
      return;
    }

    if (data && data.startDateObj)
      startDateStr = data.startDateObj.toISOString();

    if (data && data.endDateObj) {
      endDateStr = data.endDateObj.toISOString();
    }

    data.startDate = startDateStr;
    data.endDate = endDateStr;
    data.inactive = false;
    data.streak = 0;
    data.timesPostedCurrentPeriod = 0;
    data.milestoneReached = 0;

    if (data.frequencyPeriod === "per day") {
      data.startOfCurrentPeriod = dayjs().toISOString();
      data.endOfCurrentPeriod = dayjs().hour(23).minute(59).toISOString();
    } else if (data.frequencyPeriod === "per week") {
      data.startOfCurrentPeriod = dayjs().toISOString();
      data.endOfCurrentPeriod = dayjs()
        .add(6, "day")
        .hour(23)
        .minute(59)
        .toISOString();
    } else if (data.frequencyPeriod === "per month") {
      data.startOfCurrentPeriod = dayjs().toISOString();
      data.endOfCurrentPeriod = dayjs()
        .add(29, "day")
        .hour(23)
        .minute(59)
        .toISOString();
    } else if (data.frequencyPeriod === "per year") {
      data.startOfCurrentPeriod = dayjs().toISOString();
      data.endOfCurrentPeriod = dayjs()
        .add(364, "day")
        .hour(23)
        .minute(59)
        .toISOString();
    } else {
      setAlertMessage({
        error: true,
        message: "Please enter a valid frequency period",
      });
      return;
    }

    setPending(true);
    const response = await fetch("/api/goal/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: session?.user?.email as string,
        Authorization: `bearer ${session?.user?.token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      setIsGoalCreated(true);
    } else setAlertMessage({ error: true, message: result.message });
    setPending(false);
  };

  return (
    <div className="mx-8">
      <AlertDialog
        showDialog={isGoalCreated}
        title="Goal Added!"
        buttonText="View in profile"
        path={`/profile/${session?.user.username}?type=goals`}
        revalidate={async() => {revalidatePage(`/profile/${session?.user?.username}`)}}
      />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-semibold text-main mt-20">
                  Create a goal
                </div>
                <div className="text-secondaryText text-center mb-8">
                  <div>Already have a goal in mind?</div>
                  <div>Create a goal with us now!</div>
                </div>
              </div>
              <div className="w-80 -my-5 mb-0.5">
                {Boolean(alertMessage.message) && (
                  <Alert severity={alertMessage.error ? "error" : "success"}>
                    {alertMessage.message}
                  </Alert>
                )}
              </div>
              <div className="w-full">
                <TextField
                  label="Goal name"
                  variant="standard"
                  className="input-field"
                  {...register("name", {
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
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
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
              <div className="w-full flex flex-col gap-6" id="hehehaha">
                <div className="text-xs text-secondaryText flex items-center gap-2">
                  <div>
                    <Info sx={{ color: "#838383" }} />
                  </div>
                  <div>
                    Start date would determine the start of the period.{" "}
                    {!readMore && (
                      <span
                        className="text-blue-400 underline"
                        onClick={() => setReadMore(true)}
                      >
                        Read more.
                      </span>
                    )}
                    {readMore && (
                      <span>
                        {" "}
                        e.g if you have a weekly goal and the start date is a
                        Monday, your week for this goal would start on Monday
                        and end on Sunday.{" "}
                        <span
                          className="text-blue-400 underline"
                          onClick={() => setReadMore(false)}
                        >
                          Read less.
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <Controller
                  name="startDateObj"
                  defaultValue={startDateObj}
                  control={control}
                  render={({ field: { onChange, ...restField } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start Date"
                        disablePast
                        format="DD/MM/YYYY"
                        onChange={(event) => {
                          onChange(event);
                          setStartDateObj(event);
                        }}
                        slotProps={{ textField: {} }}
                        {...restField}
                      />
                    </LocalizationProvider>
                  )}
                />

                <Controller
                  name="endDateObj"
                  defaultValue={endDateObj}
                  control={control}
                  render={({ field: { onChange, ...restField } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        minDate={dayjs(startDateObj).add(1, "day")}
                        label="End Date (optional)"
                        format="DD/MM/YYYY"
                        onChange={(event) => {
                          onChange(event);
                          setEndDateObj(event);
                        }}
                        slotProps={{ textField: {} }}
                        {...restField}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
              <div className="flex flex-col items-center gap-2 flex justify-center mt-5">
                <PrimaryButton text="Create" pending={pending} />
                {fromRegister === "true" ? (
                  <Link href="/">
                    <span className="text-sm">Or continue without goal</span>
                  </Link>
                ) : (
                  <Link href={`/profile/${session?.user.username}`}>
                    <span className="text-sm">Back to profile</span>
                  </Link>
                )}
              </div>
              <div></div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

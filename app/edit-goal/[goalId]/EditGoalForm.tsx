"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Select, MenuItem, TextField, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { GoalType, Goal, Post, UserGoal } from "@/types/model";
import Message from "@/app/lib/message/Message";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { Info } from "@mui/icons-material";
import TitleHeaderWithClose from "@/components/header/TitleHeaderWithClose";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import AlertDialog from "@/components/dialogs/AlertDialog";
import revalidatePage from "@/app/lib/actions/revalidatePage/revalidatePage";

export type EditGoalInputs = {
  name: string;
  frequencyCount: number;
  frequencyPeriod: string;
  startDate: string;
  endDate: string;
  startDateObj: Dayjs | null;
  endDateObj: Dayjs | null;
  startOfCurrentPeriod: string;
  endOfCurrentPeriod: string;
};

interface EditGoalFormProps {
  userGoal: UserGoal;
}

export default function EditGoalForm({ userGoal }: EditGoalFormProps) {
  const [startDateObj, setStartDateObj] = useState<Dayjs | null>(
    dayjs(String(userGoal.startDate))
  );
  const [endDateObj, setEndDateObj] = useState<Dayjs | null>(
    dayjs(String(userGoal.endDate)).isSame(
      dayjs("1970-01-01T00:00:00.000+00:00")
    )
      ? null
      : dayjs(String(userGoal.endDate))
  );
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    message: "",
  });

  const [isGoalEdited, setIsGoalEdited] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const { data: session } = useSession();
  const [readMore, setReadMore] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditGoalInputs>();

  const onSubmit: SubmitHandler<EditGoalInputs> = async (data) => {
    setAlertMessage({ error: false, message: "" });
    let startDateStr = "";
    let endDateStr = "";

    try{
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

    if (data.frequencyPeriod === "per day") {
      data.startOfCurrentPeriod = dayjs(data.startDate).toISOString();
      data.endOfCurrentPeriod = dayjs(data.startDate).hour(23).minute(59).toISOString();
    } else if (data.frequencyPeriod === "per week") {
      data.startOfCurrentPeriod = dayjs(data.startDate).toISOString();
      data.endOfCurrentPeriod = dayjs(data.startDate)
        .add(6, "day")
        .hour(23)
        .minute(59)
        .toISOString();
    } else if (data.frequencyPeriod === "per month") {
      data.startOfCurrentPeriod = dayjs(data.startDate).toISOString();
      data.endOfCurrentPeriod = dayjs(data.startDate)
        .add(29, "day")
        .hour(23)
        .minute(59)
        .toISOString();
    } else if (data.frequencyPeriod === "per year") {
      data.startOfCurrentPeriod = dayjs(data.startDate).toISOString();
      data.endOfCurrentPeriod = dayjs(data.startDate)
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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        email: session?.user?.email as string,
        Authorization: `bearer ${session?.user?.token}`,
      },
      body: JSON.stringify({ originalUserGoal: userGoal, ...data }),
    });

    const result = await response.json();
    if (response.ok){
      revalidatePage(`/profile/${session?.user?.username}`);
      setIsGoalEdited(true);
    }
    else setAlertMessage({ error: true, message: result.message });
    }
    catch(error){
      if(error instanceof Error)
        setAlertMessage({error : true, message : error.message})
    }
    finally{
      setPending(false);
    }
  };

  return (
    <>
      <AlertDialog
        showDialog={isGoalEdited}
        title="Goal edited"
        content=" You  have successfully edited your goal. View it in your profile."
        buttonText="View profile"
        path={`/profile/${session?.user?.username as string}`}
      />
      <TitleHeaderWithClose title="Edit Goal" />
      <div className="mx-8 mt-14">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-6">
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
                defaultValue={userGoal.name}
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
              <SecondaryButton text={userGoal.goalName} disabled={true} />
            </div>
            <div className="flex flex-col w-full">
              <div className="text-secondaryText mb-3">Goal Period</div>
              <div className="flex gap-4 justify-center">
                <div className="w-20">
                  <TextField
                    defaultValue={userGoal.frequencyCount}
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
                    defaultValue={userGoal.frequencyPeriod}
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
                      Monday, your week for this goal would start on Monday and
                      end on Sunday.{" "}
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
            <div className="mt-8">
              <PrimaryButton text="Edit" pending={pending} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

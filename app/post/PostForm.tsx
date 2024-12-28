"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CollectionsOutlined, PhotoCamera } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Alert,
  FormHelperText,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";

import TitleHeaderWithClose from "@/components/header/TitleHeaderWithClose";
import AlertDialog from "@/components/dialogs/AlertDialog"
import NoImageSelected from "@/components/placeholders/NoImageSelected";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Post, UserGoal } from "@/types/model";
import Message from "../lib/message/Message";
import { handleUploadS3 } from "../lib/actions/imageUpload/imageUpload";
import revalidatePage from "@/app/lib/actions/revalidatePage/revalidatePage";

interface PostFormProps {
  userGoals : UserGoal[];
}

export default function PostForm({userGoals} : PostFormProps) {
  const [pending, setPending] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [image, setImage] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    message: "",
  });
  const [postCreated, setPostCreated] = useState(false);
  const { data : session } = useSession();
  const username = session?.user.username as string;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = async (data) => {
    try {
      setPending(true);
      let imageData : FormData = new FormData();

      if(image === null)
        return

      imageData.append("file", image, "image")

      const { statusCode, fileName } = await handleUploadS3(imageData);

      if (statusCode != 200) {
        setAlertMessage({
          error: true,
          message: Message.Error.UnsuccessfulImageUpload,
        });
        return;
      }
      data.imageUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${fileName}`;
      // data.imageUrl = `https://dailies-image-bucket.s3.ap-southeast-1.amazonaws.com/1196c2cc9a084361803aee494f8c4111.image`

      // assign required details to post 
      data.postedDateTime = dayjs().toISOString();
      data.username = username;
      const selectedUserGoal = userGoals.filter((userGoal) => userGoal._id === data.userGoalId)
      data.frequencyCount = selectedUserGoal[0].frequencyCount;
      data.frequencyPeriod = selectedUserGoal[0].frequencyPeriod;
      data.goalName = selectedUserGoal[0].goalName;
      data.userGoalName = selectedUserGoal[0].name;
      data.goalStartDate = selectedUserGoal[0].startDate;
      data.goalEndDate = selectedUserGoal[0].endDate;
      data.editedDateTime = "";

      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setPending(false);
        //const result = await response.json();
        setAlertMessage({
          error: true,
          message: Message.Error.UnsuccessfulPostCreation,
        });
      } else {
        revalidatePage("/profile/[username]")
        setPostCreated(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <AlertDialog
        showDialog={postCreated}
        title="Post created"
        buttonText="View in profile"
        path={`/profile/${username}`}
       />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between h-screen">
          <div>
            <TitleHeaderWithClose title = "New Post" />
            <div className="flex flex-col gap-3">
              {Boolean(alertMessage.message) && (
                <Alert severity={alertMessage.error ? "error" : "success"}>
                  {alertMessage.message}
                </Alert>
              )}
              <div
                className="border-b-2 lg:border-2 h-[40vh] cursor-pointer flex flex-col items-center"
                onClick={() => {
                  document.getElementById("file_upload")?.click();
                }}
              >
                {image ? (
                  <img src={previewImage} className="h-full" />
                ) : (
                  <NoImageSelected />
                )}
              </div>
              <div className="flex justify-end mx-6 lg:mx-3 gap-4">
                <div
                  className="bg-gray-200 rounded-full p-1.5 cursor-pointer hover:bg-gray-300"
                  onClick={() => {
                    document.getElementById("file_upload")?.click();
                  }}
                >
                  <CollectionsOutlined sx={{ color: "#1D5D9B" }} />

                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    id="file_upload"
                    onChange={handleUploadImage}
                  />
                </div>
                <div className="bg-gray-200 rounded-full p-1.5">
                  <PhotoCamera sx={{ color: "#1D5D9B" }} />
                </div>
              </div>
              <div>
                <TextField
                  placeholder="Write a caption..."
                  multiline
                  fullWidth
                  rows={6}
                  {...register("caption", {
                    required: Message.Error.RequiredField,
                    maxLength: {
                      value: 250,
                      message: Message.Error.Max250Characters,
                    },
                  })}
                  error={Boolean(errors.caption)}
                  helperText={errors.caption?.message}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-12 gap-8">
            <div className="w-[80%]">
              <FormControl fullWidth variant="standard">
                <InputLabel id="goal-label">Choose a goal</InputLabel>
                <Select
                  defaultValue={""}
                  {...register("userGoalId", {
                    required: Message.Error.RequiredField,
                  })}
                  error={Boolean(errors.userGoalId)}
                >
                  {userGoals &&
                    userGoals.map((userGoal, idx) => {
                      return (
                        <MenuItem key={idx} value={String(userGoal._id)}>
                          {userGoal.name}
                        </MenuItem>
                      );
                    })}
                </Select>
                {Boolean(errors.userGoalId) && (
                  <FormHelperText>
                    <span className="text-red-600">
                      {Message.Error.RequiredField}
                    </span>
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div>
              <PrimaryButton text="Share" pending={pending} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

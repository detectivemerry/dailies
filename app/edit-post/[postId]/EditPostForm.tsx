"use client";
import React, { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from "react";
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
import revalidatePage from "@/app/lib/actions/revalidatePage/revalidatePage";

import TitleHeaderWithClose from "@/components/header/TitleHeaderWithClose";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Post, UserGoal } from "@/types/model";
import Message from "@/app/lib/message/Message";
import AlertDialog from "@/components/dialogs/AlertDialog";
import { handleUploadS3 } from "@/app/lib/actions/imageUpload/imageUpload";

interface EditPostPageProps {
  post: Post;
}

export default function EditPostForm({ post }: EditPostPageProps) {
  const [pending, setPending] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    post.imageUrl
  );
  const [image, setImage] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    message: "",
  });
  const [postEdited, setPostEdited] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = async (data, e? : BaseSyntheticEvent) => {
    try {
      e?.preventDefault();
      setPending(true);
      if (image !== null) {
        let imageData: FormData = new FormData();
        imageData.append("file", image, "image");
        const { statusCode, fileName } = await handleUploadS3(imageData);

        if (statusCode != 200) {
          setAlertMessage({
            error: true,
            message: Message.Error.UnsuccessfulImageUpload,
          });
          return;
        }
        data.imageUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${fileName}`;
      }
      data._id = post._id;
      data.editedDateTime = dayjs().toISOString();

      const response = await fetch("/api/post", {
        method: "PATCH",
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
          message: Message.Error.UnsuccessfulPostEdit,
        });
      } else {
        // await revalidatePage("/profile/[username]")
        setPostEdited(true);
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
        showDialog={postEdited}
        title="Post successfully edited"
        content="Post has been updated, view the updated post in profile."
        buttonText="View in profile"
        path={`/profile/${post.username}?type=posts`}
        revalidate={async() => {revalidatePage("/profile/[username]")}}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between h-screen">
          <div>
            <TitleHeaderWithClose title="Edit post" />
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
                <img src={previewImage} className="h-full" />
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
                  {/* color when photo camera feature is available  */}
                  {/* <PhotoCamera sx={{ color: "#1D5D9B" }} /> */}
                  <PhotoCamera sx={{ color: "#A9A9A9" }} />
                </div>
              </div>
              <div>
                <TextField
                  placeholder="Write a caption..."
                  multiline
                  fullWidth
                  rows={6}
                  defaultValue={post.caption}
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
          <div className="flex flex-col items-center mb-24 gap-8">
            <div className="w-[80%]">
              <FormControl fullWidth variant="standard">
                <InputLabel id="goal-label">Goal selected</InputLabel>
                <Select defaultValue={post.goalName} disabled={true}>
                  <MenuItem
                    key={String(post._id)}
                    value={String(post.goalName)}
                  >
                    {post.goalName}
                  </MenuItem>
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
              <PrimaryButton text="Edit" pending={pending} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

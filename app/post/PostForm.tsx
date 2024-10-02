"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CollectionsOutlined, PhotoCamera } from "@mui/icons-material";
import { MenuItem, Select, TextField, Button } from "@mui/material";

import PostTitleHeader from "./PostTitleHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Post } from "@/types/model";
import NoImageSelected from "./NoImageSelected";
import Message from "../lib/message/Message";

export default function PostForm({ userGoals }) {
  const [pending, setPending] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = async (data) => {
    setPending(true);
    const imgUrl = "www.google.com"

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setPending(false);
        const result = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <PostTitleHeader />
          </div>
          <div
            className="border-2 h-[50vh] cursor-pointer"
            onClick={() => {
              document.getElementById("file_upload")?.click();
            }}
          >
            <NoImageSelected />
          </div>
          <div className="flex justify-end my-3 mx-6 lg:mx-3 gap-4">
            <div
              className="bg-gray-200 rounded-full p-1.5 cursor-pointer hover:bg-gray-300"
              onClick={() => {
                document.getElementById("file_upload")?.click();
              }}
            >
              <CollectionsOutlined sx={{ color: "#1D5D9B" }} />

              <input type="file" accept=".png" hidden id="file_upload" />

              {/* <Button
                component= "label"
                startIcon = { />}
              >
              </Button> */}
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
                required : Message.Error.RequiredField,
                maxLength : {
                  value : 50,
                  message : Message.Error.Max250Characters
                }
              })}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <Select
              defaultValue={"goal A"}
              {...register("goalId", {
                required: Message.Error.RequiredField,
              })}
            >
              <MenuItem>First option</MenuItem>
            </Select>
          </div>
          <div>
            <PrimaryButton text="Share" pending={pending} />
          </div>
        </div>
      </form>
    </div>
  );
}

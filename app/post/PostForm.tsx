"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CollectionsOutlined, PhotoCamera } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid";

import PostTitleHeader from "./PostTitleHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Post, UserGoals } from "@/types/model";
import NoImageSelected from "./NoImageSelected";
import Message from "../lib/message/Message";
//import parseFile from "./fileParser";

interface PostFormProps {
  userGoals: UserGoals[];
}

export default function PostForm({ userGoals }: PostFormProps) {
  const [pending, setPending] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState({
    error: false,
    message: "",
  });

  const Bucket = process.env.NEXT_PUBLIC_S3_BUCKET;
  const s3 = new S3Client({
    region : process.env.NEXT_PUBLIC_S3_REGION,
    credentials : {
      accessKeyId : process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey : process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    }
  })

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
      await handleUploadS3();
      //const imgUrl = "www.google.com";
      //data.imageUrl = imgUrl;
      //data.postedDateTime = dayjs().toISOString();

      //const response = await fetch("/api/post", {
        //method: "POST",
        //headers: {
          //"Content-Type": "application/json",
        //},
        //body: JSON.stringify(data),
      //});

      //if (!response.ok) {
        //setPending(false);
        //const result = await response.json();
      //}
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleUploadImage = async (e : ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(!e.target.files) return;
    setImage(e.target.files[0]);

    //if(e.target.files &&  e.target.files.length > 0){
      ////setImage(URL.createObjectURL(e?.target?.files[0]));
      
      //const formData = new FormData();
      //formData.append('image', e.target.files[0]);

    //}
  };

  const handleUploadS3 = async () => {
    if(!image) return;
    const ext = image?.name.split(".").at(-1);
     const uid = uuidv4().replace(/-/g, "");
     const fileName = `${uid}${ext ? "." + ext : ""}`;

     console.log(fileName)

     try {
       const uploadToS3 = new PutObjectCommand({
         Bucket : Bucket,
         Key: fileName,
         Body: image,
       });
       const result = await s3.send(uploadToS3);
       console.log(result)
     } catch (error) {
       console.error(error);
     }

  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-between h-screen">
        <div>
          <PostTitleHeader />
          <div className="flex flex-col gap-3">
            <div
              className="border-2 h-[40vh] cursor-pointer flex flex-col items-center"
              onClick={() => {
                document.getElementById("file_upload")?.click();
              }}
            >
              {image ? <img src={image} className = "h-full"/> : <NoImageSelected />}
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
                    value: 50,
                    message: Message.Error.Max250Characters,
                  },
                })}
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
                {...register("goalId", {
                  required: Message.Error.RequiredField,
                })}
              >
                {userGoals &&
                  userGoals.map((userGoal, idx) => {
                    return (
                      <MenuItem key={idx} value={String(userGoal.goalId)}>
                        {userGoal.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div>
            <PrimaryButton text="Share" pending={pending} />
          </div>
        </div>
      </div>
    </form>
  );
}

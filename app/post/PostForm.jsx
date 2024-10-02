"use client";

import React, { useState } from "react";
import PostTitleHeader from "./PostTitleHeader";
import { CollectionsOutlined, PhotoCamera } from "@mui/icons-material";
import { MenuItem, Select, TextField } from "@mui/material";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function PostForm({userGoals}) {

  const [pending, setPending] = useState<boolean>(false)

  return (
    <div className="flex flex-col justify-between h-screen">
      <div name = "main">
        <div>
          <PostTitleHeader />
        </div>
        <div name="image" className="border-2 h-[50vh]">
          Image here
        </div>
        <div name="actions" className="flex justify-end m-2 gap-4">
          <div className="bg-gray-200 rounded-full p-1.5">
            <CollectionsOutlined sx={{ color: "#1D5D9B" }} />
          </div>
          <div className="bg-gray-200 rounded-full p-1.5">
            <PhotoCamera sx={{ color: "#1D5D9B" }} />
          </div>
        </div>
        <div name="caption">
          <TextField
            placeholder="Write a caption..."
            multiline
            fullWidth
            rows={6}
          />
        </div>
      </div>
      <div name = "footer" className = "flex flex-col items-center">
        <div name="goal dropdown">
          <Select>
            <MenuItem>First option</MenuItem>
          </Select>
        </div>
        <div name="share button">
          <PrimaryButton text = "Share" pending = {pending}/>
          
        </div>
      </div>
    </div>
  );
}

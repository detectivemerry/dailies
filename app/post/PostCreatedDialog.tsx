"use client";

import React from "react";
import { Dialog } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons/PrimaryButton";

interface PostCreatedDialogProps {
  postCreated : boolean;
}

export default function PostCreatedDialog({ postCreated } : PostCreatedDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={postCreated} PaperProps={{ sx: { borderRadius: "10px" } }}>
      <div className="flex flex-col items-center p-4">
        <div className="my-4">
          <CheckBox sx={{ fontSize: "3rem" }} color="primary" />
        </div>
        <div className="text-main text-2xl font-bold">Post created!</div>
        <div className="text-secondaryText text-center">
          Great! Post was successfully created, view it in your profile. <br />
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <div>
            <PrimaryButton
              text="View in profile"
              onClick={() => router.push("/profile")}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

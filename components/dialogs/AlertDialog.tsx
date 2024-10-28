"use client";

import React from "react";
import { Dialog } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import PrimaryButton from "@/components/buttons/PrimaryButton";

interface PostCreatedDialogProps {
  showDialog : boolean;
  title : string;
  content : string;
  buttonText : string;
  path : string;
}

export default function PostCreatedDialog({ showDialog, title, content, buttonText, path } : PostCreatedDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={showDialog} PaperProps={{ sx: { borderRadius: "10px" } }}>
      <div className="flex flex-col items-center p-4">
        <div className="my-4">
          <CheckBox sx={{ fontSize: "3rem" }} color="primary" />
        </div>
        <div className="text-main text-2xl font-bold">{title}</div>
        <div className="text-secondaryText text-center">
          {content}<br />
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <div>
            <PrimaryButton
              text={buttonText}
              onClick={() => router.push(path)}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}


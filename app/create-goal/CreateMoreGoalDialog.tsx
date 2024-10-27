"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";

import SecondaryButton from "@/components/buttons/SecondaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { CreateGoalInputs } from "./CreateGoalForm"
import { Goal } from "@/types/model";

interface CreateMoreGoalDialogProps {
  isGoalCreated: boolean;
  setIsGoalCreated : Dispatch<SetStateAction<boolean>>;
  reset : UseFormReset<CreateGoalInputs>;
  setGoal: Dispatch<SetStateAction<Goal | null>>;
}

export default function CreateMoreGoalDialog({
  isGoalCreated,
  setIsGoalCreated,
  reset,
  setGoal,
  ...props
}: CreateMoreGoalDialogProps) {
  const router = useRouter();

  const handleClose = () => {
    reset()
    setGoal(null);
    setIsGoalCreated(false);
  }

  return (
    <Dialog
      open={isGoalCreated}
      {...props}
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <div className="flex flex-col items-center p-4">
        <div className="my-4">
          <CheckBox sx={{ fontSize: "3rem" }} color="primary" />
        </div>
        <div className="text-main text-2xl font-bold">Goal Added!</div>
        <div className="text-secondaryText text-center">
          Great! Find your goal under your <br />
          user profile
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <div>
            <SecondaryButton
              text="Add another goal"
              onClick={handleClose}
            />
          </div>
          <div>
            <PrimaryButton text="Finish" onClick={() => router.push("/")} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

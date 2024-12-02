"use client";

import React from "react";
import { Dialog } from "@mui/material";
import { Error } from "@mui/icons-material";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

interface WarningAlertDialogProps {
  showDialog: boolean;
  title: string;
  content?: string;
  buttonText: string;
  secondaryButtonText : string;
  mainDialogAction: () => void;
  secondaryDialogAction: () => void;
}

export default function WarningAlertDialog({
  showDialog,
  title,
  content,
  buttonText,
  secondaryButtonText,
  mainDialogAction,
  secondaryDialogAction,
}: WarningAlertDialogProps) {

  return (
    <Dialog open={showDialog} PaperProps={{ sx: { borderRadius: "10px" } }}>
      <div className="flex flex-col items-center p-4">
        <div className="my-4">
          <Error sx={{ fontSize: "3rem" }} color="primary" />
        </div>
        <div className="text-main text-2xl font-bold">{title}</div>
        {content && (
          <div className="text-secondaryText text-center">
            {content}
            <br />
          </div>
        )}
        <div className="mt-8 flex flex-col gap-2">
          <div>
            <PrimaryButton text={buttonText} onClick={mainDialogAction} />
          </div>
          <div>
            <SecondaryButton text = {secondaryButtonText} onClick = {secondaryDialogAction} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

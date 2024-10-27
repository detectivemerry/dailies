import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
import { useRouter } from "next/navigation";

export default function PostTitleHeader() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between border-b py-3">
        <div className="">
          <Button onClick = {() => {router.push("/")}}>
            <Close />
          </Button>
        </div>
      </div>
      <div className="fixed left-1/2 transform -translate-x-1/2 top-4 w-auto">
        <div className="flex flex-col items-center text-lg text-main">New Post</div>
      </div>
    </>
  );
}

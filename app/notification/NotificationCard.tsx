import { Circle } from "@mui/icons-material";
import React from "react";
import getAvatarIcon from "@/app/lib/avatarIcon/getAvatarIcon";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { Notification } from "@/types/model";
import computeTimeSincePosted from "@/app/lib/display/computeTimeSincePosted";
import { Button } from "@mui/material";

interface NotificationCardProps {
  notification: Notification;
}

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const AvatarIcon = getAvatarIcon(notification.icon);
  const router = useRouter();

  return (
    <div className="flex m-4 text-xs gap-3 items-center">
      <div className="rounded-full p-2 flex-1 border">
        <AvatarIcon sx = {{ color : "#1D5D9B" }} />
      </div>
      <div className="flex-3">
        <span className = "text-main">{notification.text + " "}</span>
        <span className = "text-secondaryText">
          {computeTimeSincePosted(dayjs(notification.notifiedDateTime))}
        </span>
      </div>
      <div className="flex-1">
        <Button
          variant="contained"
          sx={{
            borderRadius: "25px",
            fontWeight: "bold",
            color: "#1D5D9B",
            backgroundColor: "#FBEEAC",
            textTransform: "none",
            ":hover": {
              backgroundColor: "#F9E47B",
            },
            paddingY: "0.5rem",
            fontSize : "0.75rem",
          }}
          disableElevation={true}
          onClick = {() => {router.push(`${notification.path}`)}}
        >
          {notification.buttonText}
        </Button>
      </div>
    </div>
  );
}

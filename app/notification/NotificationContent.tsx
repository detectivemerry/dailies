"use client";

import { Notification } from "@/types/model";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import NotificationCard from "./NotificationCard";
import SectionHeader from "@/components/header/SectionHeader";
import { Circle } from "@mui/icons-material";

interface NotificationContentProps {
  notifications: Array<Notification>;
}

export default function NotificationContent({
  notifications,
}: NotificationContentProps) {
  const { data: session } = useSession();

  const unseenNotifications = notifications.filter(
    (notification) => notification.seen == false
  );
  const seenNotifications = notifications.filter(
    (notification) => notification.seen == true
  );

  useEffect(() => {
    return () => {
      console.log("unmounted");
      if (session?.user.username) updateNotifications();
    };
  }, []);

  const updateNotifications = async () => {
    const notificationResponse = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/notifications/new`,
      {
        method: "PATCH",
        headers: { username: session?.user.username || "" },
        cache: "no-store",
      }
    );
    const { data: notificationData } = await notificationResponse.json();
  };

  return (
    <div className="flex flex-col">
      <div className="-mb-4">
        <SectionHeader>Notifications</SectionHeader>
      </div>
      {unseenNotifications.length > 0 && (
        <div className="flex justify-between items-center p-4 pr-6 pb-2">
          <div className="font-bold text-main">New notifications</div>
          <Circle sx={{ color: "#ADD8E6", fontSize: "0.75rem" }} />
        </div>
      )}
      {unseenNotifications.length > 0 &&
        unseenNotifications.map((notification) => (
          <NotificationCard
            notification={notification}
            key={String(notification._id)}
          />
        ))}
      {seenNotifications && (
        <div className="p-4 pb-2">
          <div className="font-bold text-main">Read notifications</div>
        </div>
      )}
      {seenNotifications &&
        seenNotifications.map((notification) => (
          <NotificationCard
            notification={notification}
            key={String(notification._id)}
          />
        ))}
    </div>
  );
}

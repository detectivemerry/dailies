"use client";

import { Notification } from "@/types/model";
import React from "react";

import NotificationCard from "./NotificationCard";
import SectionHeader from "@/components/header/SectionHeader";

interface NotificationContentProps {
  notifications: Array<Notification>;
}

export default function NotificationContent({
  notifications,
}: NotificationContentProps) {
  return (
    <div className="flex flex-col">
      <div className="-mb-4">
        <SectionHeader>Notifications</SectionHeader>
      </div>
      <div>
        {notifications &&
          notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              key={String(notification._id)}
            />
          ))}
      </div>
    </div>
  );
}

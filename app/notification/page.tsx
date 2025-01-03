import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import NotificationContent from "./NotificationContent";

export default async function page() {
  const session = await getServerSession(authOptions);

  const notificationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/notifications`,
    {
      method: "GET",
      headers: { username: session?.user.username || "" },
      cache: "no-store",
    }
  );
  console.log(notificationResponse.status);

  const { data: notificationData } = await notificationResponse.json();
  
  if(Array.isArray(notificationData))
    notificationData.reverse()

  return (
    <div>
      <NotificationContent
        notifications={notificationData ? notificationData : []}
      />
    </div>
  );
}

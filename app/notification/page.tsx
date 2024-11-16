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
  console.log(notificationData);

  // const notitifcations : Array<Notification> = [{
  //   type : NotificationTypes.CommunitySubscription,
  //   icon : "COMMUNITY_SUBSCRIPTION",
  //   text : "Successfully subscribed to Running. Create a Running goal today!",
  //   buttonText : "View",
  //   path : `/community/running`,
  //   _id : new ObjectId(),
  //   notifiedDateTime : new Date().toISOString(),
  //   seen : false,
  //   userId : new ObjectId("507f1f77bcf86cd799439011"),
  //   username : "",
  // }]

  return (
    <div>
      <NotificationContent
        notifications={notificationData ? notificationData : []}
      />
    </div>
  );
}

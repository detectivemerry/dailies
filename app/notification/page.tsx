import React from 'react'
import { ObjectId } from "mongodb";
import NotificationContent from './NotificationContent'
import { Notification, NotificationTypes } from "@/types/model";

export default function page() {
  const notitifcations : Array<Notification> = [{
    type : NotificationTypes.CommunitySubscription,
    icon : "COMMUNITY_SUBSCRIPTION",
    text : "Successfully subscribed to Running. Create a Running goal today!",
    buttonText : "View",
    path : `/community/running`,
    _id : new ObjectId(),
    notifiedDateTime : new Date().toISOString(),
    seen : false,
  }]

  return (
    <div>
      <NotificationContent notifications = {notitifcations}/>
    </div>
  )
}

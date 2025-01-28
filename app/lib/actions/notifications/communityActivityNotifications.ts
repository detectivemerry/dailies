"use server";

import connectDB from "@/app/lib/mongodb";
import { UserGoal } from "@/types/model";
import { ObjectId } from "mongodb";
import { NotificationGoal } from "@/types/model";
import NotificationConfig from "@/app/lib/notification/notificationConfig";

const sendCommunityActivityNotifications = async (userEmail: string) => {
  // select goals that has crossed the midpoint for the current time period as possible candidates to send notifications to

  const client = await connectDB();
  const db = client.connection.useDb(`Dailies`);

  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method: "GET",
    headers: { email: userEmail },
    cache: "no-store",
  });

  const { data: userData } = await userResponse.json();

  const filter = { email: userEmail };
  const userDoc = await db
    .collection("Users")
    .findOne(filter, { projection: { goals: 1, _id: 0, username: 1 } });

  if (!userDoc) {
    return { error: true, message: "failed to update" };
  }

  // checks for community activity notification that belongs to user AND in current time period AND the collected goal
  let notifications = await db
    .collection("Notifications")
    .find({
      type: "COMMUNITY_ACTIVITY",
      username: userDoc.username,
    })
    .toArray();

  let notifyList = userDoc.goals.filter((goal: UserGoal) => {
    const startOfCurrentPeriod = new Date(String(goal.startOfCurrentPeriod));
    const endOfCurrentPeriod = new Date(String(goal.endOfCurrentPeriod));
    const middleDate = new Date(
      (startOfCurrentPeriod.getTime() + endOfCurrentPeriod.getTime()) / 2
    );
    const today = new Date();
    let found = false;

    notifications.forEach((notification) => {
      const notificationDate = new Date(String(notification.notifiedDateTime));
      if (notificationDate >= startOfCurrentPeriod) found = true;
    });

    return today >= middleDate && !found;
  });

  // If not, count the number of new posts within the current time period in the same goal type
  notifyList = await Promise.all(
    notifyList.map(async (goal: UserGoal) => {
      const userGoalId = new ObjectId(goal._id);
      // const startOfCurrentPeriod = new Date(String(goal.startOfCurrentPeriod))
      const numberOfPosts = await db.collection("Posts").countDocuments({
        userGoalId: userGoalId,
        // double check if $gt does work with our startOfCurrentPeriod
        postedDateTime: { $gt: goal.startOfCurrentPeriod },
      });
      return {
        ...goal,
        numberOfPosts,
        frequencyPeriod: goal.frequencyPeriod.slice(4),
      };
    })
  );

  // create new notification with above information
  if (notifyList.length == 0) return;

  // remove duplicated notifications for same communities
  // remove notifications for communities with 0 posts
  const seen = new Set();
  notifyList = notifyList.filter((notification : NotificationGoal) => {
    if(seen.has(notification.goalName) || notification.numberOfPosts == 0){
      return false
    }
    seen.add(notification.goalName)
    return true
  })

  notifyList = notifyList.map((notification: NotificationGoal) => {

    let text = NotificationConfig.CommunityActivity.text.replace(
      "*",
      String(notification.numberOfPosts)
    );
    text = text.replace("**", notification.goalName);
    text = text.replace("***", notification.frequencyPeriod);

    return {
      type: NotificationConfig.CommunityActivity.type,
      icon: NotificationConfig.CommunityActivity.icon,
      text: text,
      buttonText: NotificationConfig.CommunityActivity.buttonText,
      path: NotificationConfig.CommunityActivity.path,
      notifiedDateTime: new Date().toISOString(),
      seen: false,
      userId: userData._id,
      username: userData.username,
    };
  });

  const sendNotificationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/notifications/community-activity`,
    {
      method: "POST",
      body: JSON.stringify({
        notifyList: notifyList,
      }),
    }
  );

};

export default sendCommunityActivityNotifications;

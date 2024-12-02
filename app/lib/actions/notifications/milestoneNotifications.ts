"use server";
import { getServerSession } from "next-auth";
import dayjs from "dayjs";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { UserGoal } from "@/types/model";
import {
  computePieChartData,
  isDefaultDate,
} from "../../display/userGoalCardDisplay";
import NotificationConfig from "../../notification/notificationConfig";
import { ObjectId } from "mongodb";

type UserNotification = {
  type: string;
  icon: string;
  text: string;
  buttonText: string;
  path: string;
  notifiedDateTime: string;
  seen: boolean;
  userId: ObjectId;
  username: string;
};

const sendMilestoneNotifications = async () => {
  // get user goals
  const session = await getServerSession(authOptions);
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
    method: "GET",
    headers: { username: session?.user.username },
    cache: "no-store",
  });

  const { data: userData } = await userResponse.json();

  // iterate through goals to detect any milestones hit
  let newNotifications: UserNotification[] = [];
  let goalsMilestone100: ObjectId[] = [];
  let goalsMilestone75: ObjectId[] = [];
  let goalsMilestone50: ObjectId[] = [];
  let goalsMilestone25: ObjectId[] = [];

  if (Array.isArray(userData.goals)) {
    userData.goals.forEach((userGoal: UserGoal) => {
      const endDate = dayjs(String(userGoal.endDate));
      const isLifeLongGoal = isDefaultDate(endDate);

      // ignore goals that have already reached 100 milestones and lifelong goals
      if (userGoal.milestoneReached >= 100 || isLifeLongGoal) return;

      const pieChartData = computePieChartData(userGoal);
      const percentCompleted = Number(
        pieChartData.percentCompleted.replace("%", "")
      );
      let newMilestone = 0;

      if (percentCompleted >= 100) {
        goalsMilestone100.push(userGoal._id);
        newMilestone = 100;
      } else if (percentCompleted >= 75 && userGoal.milestoneReached < 75) {
        goalsMilestone75.push(userGoal._id);
        newMilestone = 75;
      } else if (percentCompleted >= 50 && userGoal.milestoneReached < 50) {
        goalsMilestone50.push(userGoal._id);
        newMilestone = 50;
      } else if (percentCompleted >= 25 && userGoal.milestoneReached < 25) {
        goalsMilestone25.push(userGoal._id);
        newMilestone = 25;
      }

      if (newMilestone > 0)
        newNotifications.push({
          type: NotificationConfig.Milestone.type,
          icon: NotificationConfig.Milestone.icon,
          text: NotificationConfig.Milestone.text.replace(
            "*",
            String(userGoal.name)
          ),
          buttonText: NotificationConfig.Milestone.buttonText,
          path: NotificationConfig.Milestone.path.replace(
            "*",
            String(session?.user.username)
          ),
          notifiedDateTime: new Date().toISOString(),
          seen: false,
          userId: userData._id,
          username: userData.username,
        });
    });
  }
;
  if (newNotifications.length === 0)
    return { error: false, message: "no new milestones update" };

  const updateMilestone = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/notifications/milestones`,
    {
      method: "PATCH",
      body: JSON.stringify({
        goalsMilestone100: goalsMilestone100,
        goalsMilestone75: goalsMilestone75,
        goalsMilestone50: goalsMilestone50,
        goalsMilestone25: goalsMilestone25,
        newNotifications: newNotifications,
      }),
    }
  );
  if (!updateMilestone.ok) {
    return { error: true, message: "failed to update" };
  } else {
    return { error: false, message: "update success" };
  }
};

export default sendMilestoneNotifications;

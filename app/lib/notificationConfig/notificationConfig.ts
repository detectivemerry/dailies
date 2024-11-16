import { NotificationTypes } from "@/types/model";

const NotificationConfig = {
  AutoCommunitySubscription: {
    type: NotificationTypes.CommunitySubscription,
    icon: "GOAL_ADJUSTMENT",
    text: "Successfully subscribed to *. Create a * goal today!",
    buttonText: "Create",
    path: "/community/*",
  },
  CommunitySubscription: {
    type: NotificationTypes.CommunitySubscription,
    icon: "GOAL_ADJUSTMENT",
    text: "Successfully subscribed to *. Check out the community!",
    buttonText: "View",
    path: "/community/*",
  },
  CommunityActivity: {
    type: NotificationTypes.CommunityActivity,
    icon: "GOAL_ADJUSTMENT",
    text: "Successfully subscribed to *. Check out the community!",
    buttonText: "View",
    path: "/community/*",
  },
  Milestone: {
    type: NotificationTypes.Milestone,
    icon: "MILESTONE",
    text: "Congrats on reaching your milestone in *",
    buttonText: "View",
    path: "/profile/*",
  },
  GoalAdjustment: {
    type: NotificationTypes.GoalAdjustment,
    icon: "GOAL_ADJUSTMENT",
    text: "Try lowering * goal's frequency - it might help you stay consistent and avoid feeling overwhelmed!",
    buttonText: "View",
    path: "/profile/*",
  },
};

export default NotificationConfig;

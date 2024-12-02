const NotificationConfig = {
  AutoCommunitySubscription: {
    type: "AUTO_COMMUNITY_SUBSCRIPTION",
    icon: "COMMUNITY_SUBSCRIPTION",
    text: "Successfully subscribed to *. Create a * goal today!",
    buttonText: "Create",
    path: "/community/*",
  },
  CommunitySubscription: {
    type: "COMMUNITY_SUBSCRIPTION",
    icon: "COMMUNITY_SUBSCRIPTION",
    text: "Successfully subscribed to *. Check out the community!",
    buttonText: "View",
    path: "/community/*",
  },
  CommunityActivity: {
    type: "COMMUNITY_ACTIVITY",
    icon: "COMMUNITY_ACTIVITY",
    text: "* users have posted this week in **! Add yours today!",
    buttonText: "POST",
    path: "/create-post",
  },
  Milestone: {
    type: "MILESTONE",
    icon: "MILESTONE",
    text: "Congrats on reaching your milestone in \"*\"!",
    buttonText: "View",
    path: "/profile/*",
  },
  GoalAdjustment: {
    type: "GOAL_ADJUSTMENT",
    icon: "GOAL_ADJUSTMENT",
    text: "Try lowering * goal's frequency - it might help you stay consistent and avoid feeling overwhelmed!",
    buttonText: "Adjust",
    path: "/edit-goal/*",
  },
};

export default NotificationConfig;

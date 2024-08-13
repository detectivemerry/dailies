import React, { Dispatch, SetStateAction } from "react";
import { ObjectId } from "mongodb";
import {
  FavoriteOutlined,
  FitnessCenterOutlined,
  LunchDiningOutlined,
  SchoolOutlined,
  AttachMoneyOutlined,
  SentimentSatisfiedAltOutlined,
  QuestionMarkOutlined,
  WorkOutline,
} from "@mui/icons-material";
import {
  SvgIcon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GoalTypeHeader from "./GoalTypeHeader";

interface GoalType {
  _id: ObjectId;
  name: string;
  goal_id: string;
  avatarIcon: string;
}

interface GoalTypeProps {
  goalTypes: GoalType[];
  setSelectGoalTypeSubMenu: Dispatch<SetStateAction<boolean>>;
  setGoal: Dispatch<SetStateAction<string | null>>;
}

type SvgIconComponent = typeof SvgIcon;

export default function GoalType({
  goalTypes,
  setSelectGoalTypeSubMenu,
  setGoal,
}: GoalTypeProps) {
  const getAvatarIcon = (avatarIcon: string): SvgIconComponent => {
    switch (avatarIcon) {
      case "HEALTH":
        return FavoriteOutlined;
      case "EXERCISE":
        return FitnessCenterOutlined;
      case "DIET":
        return LunchDiningOutlined;
      case "SCHOOL":
        return SchoolOutlined;
      case "CAREER":
        return WorkOutline;
      case "FINANCIAL":
        return AttachMoneyOutlined;
      case "MENTAL_WELLNESS":
        return SentimentSatisfiedAltOutlined;
      default:
        return QuestionMarkOutlined;
    }
  };

  return (
    <div className="w-full">
      <div>
        <GoalTypeHeader
          headerText="Goal Type"
          onClick={() => setSelectGoalTypeSubMenu(true)}
        />
      </div>

      <List>
        <div className = "flex flex-col gap-4">
          {Array.isArray(goalTypes) &&
            goalTypes.map((goalType) => {
              const AvatarIcon = getAvatarIcon(goalType.avatarIcon);
              return (
                <ListItem
                  key={String(goalType._id)}
                  className="bg-secondary"
                >
                  <ListItemIcon>
                    <AvatarIcon />
                  </ListItemIcon>
                  <ListItemText> {goalType.name}</ListItemText>
                </ListItem>
              );
            })}
        </div>
      </List>
    </div>
  );
}

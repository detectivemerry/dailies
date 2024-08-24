import { ObjectId } from "mongodb";

export interface Goal {
  goal_name : string;
  goal_id : ObjectId;
  no_of_members : Number;
  avatarIcon : string;
}

export interface GoalType {
  _id: ObjectId;
  name: string;
  avatarIcon: string;
  goals : Goal[];
}
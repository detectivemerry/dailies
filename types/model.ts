import { ObjectId } from "mongodb";
import { Date } from "mongoose";

export interface Collections {
    Users : User[];
    GoalTypes : GoalType[]; 
}

export interface User {
    _id : ObjectId; //'1a2b3c4d5e'
    firstName : string; //"John"
    lastName : string; //"Smith"
    username : string; //"Js1909"
    email : string; //"js1909@gmail.com"
    password : string; //"!@Qw#$5rer234cw5#$%regtg2"
    goals : Goal[]
    subscribedCommunities : UserSubscribedCommunity[]
}

export interface UserSubscribedCommunity {
    _id : ObjectId,
    goalId : ObjectId,
    subscribeddDateTime : Date,
    name : string;
} 

export interface GoalType {
    _id : ObjectId; //'1a2b3c4d5e'
    name : string; //"Fitness"
    icon : string; //"FITNESS"
    goals : Goal[];
}

export type Goal = {
    _id : ObjectId; //'1a2b3c4d5e'
    name : string; //"Gym"
    icon : string; //"GYM"
    no_of_members : number; //123
}

export type UserGoal = {
    name : string; //running
    endDate : Date; //"2024-09-18T16:00:00.000Z"
    startDate : Date; //"2024-09-18T16:00:00.000Z"
    frequencyCount : number; //3
    frequencyPeriod : string; //per week
    _id : ObjectId; //'1a2b3c4d5e'
    goalId : ObjectId;
    inactive : boolean;
    goalName : string;
    streak : number;
    timesPostedCurrentPeriod : number;
    startOfCurrentPeriod : Date;
    endOfCurrentPeriod : Date;
    milestoneReached : number;
}

export type Post = {
    caption : string //"my day was..." 
    imageUrl : string //www.s3/imageurl.com
    postedDateTime : string //"2024-09-18T16:00:00.000Z"
    _id : ObjectId; //'1a2b3c4d5e'
    // remove goalId, included in userGoal
    //goalId : ObjectId;
    //new fields
    userGoalId : ObjectId;
    userId : ObjectId;
    username : string;
    goalId : ObjectId;
    goalName : string;
    frequencyCount : number;
    frequencyPeriod : string;
    inactive : boolean;
    goalStartDate : string;
    goalEndDate : string;
    editedDateTime : string;
    userGoalName : String;
}

export type Notification = {
    type : string,
    icon : string,
    text : string,
    buttonText : string,
    path : string,
    _id : ObjectId,
    notifiedDateTime : string,
    seen : boolean;
    userId : ObjectId;
    username : string;
}



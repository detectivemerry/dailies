import { ObjectId } from "mongodb";

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

export type UserGoals = {
    name : string; //running
    endDate : string; //"2024-09-18T16:00:00.000Z"
    startDate : string; //"2024-09-18T16:00:00.000Z"
    frequencyCount : number; //3
    frequencyPeriod : string; //per week
    _id : ObjectId; //'1a2b3c4d5e'
    inactive : boolean;
    posts : Post[];
}

export type Post = {
    caption : string //"my day was..." 
    imageUrl : string //www.s3/imageurl.com
    postedDateTime : string //"2024-09-18T16:00:00.000Z"
    _id : ObjectId; //'1a2b3c4d5e'
    goalId : ObjectId;
}

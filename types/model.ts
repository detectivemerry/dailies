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
    password : string; //"!@Qw#$5rer234cw5#$%regtg2",
    goals : UserGoal[];
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

export interface UserGoal extends Goal {
    startDate : string; //"31/12/2024"
    endDate : string; //"01/01/2024"
    frequencyCount : number; //6
    frequencyPeriod : string; //"per day"
}
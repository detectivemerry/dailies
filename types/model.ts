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
    goals : Goal[];
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
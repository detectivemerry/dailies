import { ObjectId } from "mongodb";

export interface Users {
    _id : ObjectId; //'1a2b3c4d5e'
    firstName : string; //"John"
    lastName : string; //"Smith"
    username : string; //"Js1909"
    email : string; //"js1909@gmail.com"
    password : string; //"!@Qw#$5rer234cw5#$%regtg2"
}

export interface GoalTypes {
    _id : ObjectId; //'1a2b3c4d5e'
    name : string; //"Fitness"
    icon : string; //"FITNESS"
    goals : [
        {
            _id : ObjectId; //'1a2b3c4d5e'
            name : string; //"Gym"
            icon : string; //"GYM"
            no_of_members : number; //123
        }
    ]
}
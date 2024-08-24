import { ObjectId } from "mongodb";
export type Dailies = {
    Goals: {
        _id : ObjectId; //'1a2b3c4d5e'
        type : string; //"Fitness"
        typeIcon : string; //"FITNESS"
        goals : [
            {
                goalName: string; //"Gym"
                goal_id : ObjectId; //'1a2b3c4d5e'
                goalIcon: string; //"GYM"
                no_of_members: number; //123
            }
        ]
    },
    Users: {
        _id : ObjectId; //'1a2b3c4d5e'
        firstName : string; //"John"
        lastName : string; //"Smith"
        username : string; //"Js1909"
        email : string; //"js1909@gmail.com"
        password : string; //"!@Qw#$5rer234cw5#$%regtg2"
    }
}
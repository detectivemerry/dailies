import { ObjectId } from "mongodb";

export type api = {
    users : [
        {
            method : "POST"; //Add new user
            request : {
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    firstName : string; //"John"
                    lastName : string; //"Smith"
                    username : string; //"Js1909"
                    email : string; //"js1909@gmail.com"
                    password : string; //"!@Qw#$5rer234cw5#$%regtg2"
                }
            },
            response : {
                message : string; //"Successful registration"
                status : number; //200
            }
        },
    ]
    goalTypes : [
        {
            method : "GET"; //Get all goal types
            request : {
                cache : "no-store"
            }
            response : {
                data : [
                    {
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
                ],
                status : number; //200
            }
        },
    ]
}
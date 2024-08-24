import { GoalType, User } from "./types/model";

export type api = {
    users : [
        {
            method : "POST"; //Add new user
            request : {
                headers: {
                    "Content-Type": "application/json",
                },
                body: User;
            },
            response : {
                message : string; //"Successful registration of new user"
                status : number; //200
            }
        },
        {
            method : "GET"; //Get user details
            request : {
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    username: string; //"Js1909"
                };
            },
            response : {
                data : User;
                status : number; //200
            }
        },
        {
            method : "PUT"; //Update user details
            request : {
                headers: {
                    "Content-Type": "application/json",
                },
                body: User;
            },
            response : {
                message : string; //"Successful update of user details"
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
                data : GoalType[];
                status : number; //200
            }
        },
    ],
    error : {
        response : {
            message : string; //"An unexpected error occured"
            status : number; //500
        }
    }
}
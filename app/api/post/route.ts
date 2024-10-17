import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

import { authOptions } from "../auth/[...nextauth]/auth";
import ApiMessage from "@/app/lib/message/ApiMessage";
import { Post } from "@/types/model";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    let data : Post = await req.json();
    const session = await getServerSession(authOptions);

    const userGoalObject = new ObjectId(String(data.userGoal))

    const result = await db.collection("Posts").insertOne({
      caption : data.caption,
      imageUrl : data.imageUrl,
      postedDateTime : data.postedDateTime,
      userGoal : userGoalObject,
      _id : new ObjectId(),
    })

    const { acknowledged } = result;

    if(acknowledged)
      return NextResponse.json({status : 200})
    else
      return NextResponse.json({ message : ApiMessage.Error.General}, {status : 500})

    //const result = response
    //const goalIdObject = new ObjectId(String(data.goalId));
    //const postId = new ObjectId();
    //data._id = postId;
    //const filter = {email : session?.user.email, 'goals.goalId' : goalIdObject}
    //const options = { upsert : true }

    //const update = {
      //$push : {
        //'goals.$.posts' : data
      //}
    //}
    //const result = await db.collection("Users").updateOne(filter, update, options);

    //const {matchedCount, modifiedCount} = result;

    //if(matchedCount === 0){
      //return NextResponse.json({message : ApiMessage.Error.NoUserFound}, {status : 500})
    //}
    //if(modifiedCount === 0){
      //return NextResponse.json({message : ApiMessage.Error.General}, {status : 500})
    //}

    
  } catch (error) {

    console.log(error)
    return NextResponse.json({ message : ApiMessage.Error.General}, { status: 500 });
  }
}

export async function GET(req : Request, res : NextApiResponse){

    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    // user profile
    // given userGoalId, retrieve this post

    // explore page
    // given goalId, retrieve all userGoals, get userGoalId, retrieve this post

    //home page
    //given userGoals, get userGoalId, retrieve this post
    
    // therefore, input should be for this get should be a userGoalId

    







}

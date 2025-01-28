import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

import { authOptions } from "../auth/[...nextauth]/auth";
import ApiMessage from "@/app/lib/message/ApiMessage";
import { Post, UserGoal } from "@/types/model";
import { headers } from "next/headers";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    let data: Post = await req.json();
    const session = await getServerSession(authOptions);

    // get user details for post
    const userObject = await db
      .collection("Users")
      .findOne({ email: session?.user.email }, { _id: 1 });

    if (!userObject)
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );
    const userGoalObject = new ObjectId(String(data.userGoalId));
    // insert into Post collection
    const result = await db.collection("Posts").insertOne({
      caption: data.caption,
      imageUrl: data.imageUrl,
      postedDateTime: data.postedDateTime,
      //userGoal : userGoalObject,
      userGoalId: userGoalObject,
      userId: userObject._id,
      username: data.username,
      frequencyCount: data.frequencyCount,
      frequencyPeriod: data.frequencyPeriod,
      goalName: data.goalName,
      goalStartDate: data.goalStartDate,
      goalEndDate: data.goalEndDate,
      userGoalName : data.userGoalName,
    });

    let updateFields: {
      "goals.$.timesPostedCurrentPeriod": number;
      "goals.$.streak"?: number;
    } = { "goals.$.timesPostedCurrentPeriod": 1 };

    // update userGoal's streak
    const userDoc = await db
      .collection("Users")
      .findOne({ email: session?.user.email });

    const currentUserGoal = userDoc?.goals.find(
      (userGoal: UserGoal) =>{
        return userGoal._id.equals(userGoalObject)
      }
    );

    if (
      currentUserGoal.timesPostedCurrentPeriod + 1 ==
      currentUserGoal.frequencyCount
    ) {
      updateFields["goals.$.streak"] = 1;
    }

    const updatedUserGoal = await db
      .collection("Users")
      .updateOne(
        { email: session?.user.email, "goals._id": userGoalObject },
        { $inc: updateFields }
      );

    if (result.acknowledged && updatedUserGoal.modifiedCount === 1)
      return NextResponse.json({ status: 200 });
    else
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const headerList = headers();
    const postId = headerList.get("postId");

    if (postId === null)
      return NextResponse.json(
        { message: ApiMessage.Error.NoPostFound },
        { status: 404 }
      );

    const objectId = new ObjectId(postId);

    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const postDoc = await db.collection("Posts").findOne({ _id: objectId });

    if (!postDoc) {
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: postDoc }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    let data: Post = await req.json();
    const idObject = new ObjectId(data._id);

    const updateFields: {
      caption: string;
      editedDateTime: string;
      imageUrl?: string;
    } = {
      caption: data.caption,
      editedDateTime: data.editedDateTime,
    };

    if (data.imageUrl) {
      updateFields.imageUrl = data.imageUrl;
    }

    const { modifiedCount } = await db.collection("Posts").updateOne(
      { _id: idObject },
      {
        $set: updateFields,
      }
    );

    if (modifiedCount !== 1)
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

export async function DELETE(req : Request, res : NextApiResponse){
  try{
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    let data = await req.json();
    const postIdObject = new ObjectId(String(data.postId))
    const deletePost = await db.collection("Posts").deleteOne({_id : postIdObject})

    if(deletePost.deletedCount != 1){
      return NextResponse.json({status : 500, message : ApiMessage.Error.UnsuccessfulPostDelete})
    }
    else{
      return NextResponse.json({
        status : 200
      })
    }
  }
  catch(error){
    console.log(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}
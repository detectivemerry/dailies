import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

import { authOptions } from "../auth/[...nextauth]/auth";
import ApiMessage from "@/app/lib/message/ApiMessage";
import { Post } from "@/types/model";
import { headers } from "next/headers";
import { decryptData } from "@/app/lib/encryption/encryption";

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

    const result = await db.collection("Posts").insertOne({
      caption: data.caption,
      imageUrl: data.imageUrl,
      postedDateTime: data.postedDateTime,
      //userGoal : userGoalObject,
      _id: new ObjectId(),
      userGoalId: userGoalObject._id,
      userId: userObject._id,
      username: data.username,
      frequencyCount: data.frequencyCount,
      frequencyPeriod: data.frequencyPeriod,
      goalName: data.goalName,
      goalStartDate: data.goalStartDate,
      goalEndDate: data.goalEndDate,
    });

    const { acknowledged } = result;

    if (acknowledged) return NextResponse.json({ status: 200 });
    else
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );

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
    console.log(`post id: ${postId}`);

    if (postId === null)
      return NextResponse.json(
        { message: ApiMessage.Error.NoPostFound },
        { status: 404 }
      );

    const decoded = decodeURIComponent(postId);
    const decryptedId = await decryptData(decoded);
    const objectId = new ObjectId(decryptedId)
    
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

    const { modifiedCount } = await db.collection("Posts").updateOne({ _id: data._id }, {
      $set : {
        caption : data.caption,
        imageUrl : data.imageUrl
      }
    });
    
    if(modifiedCount !== 1)
      return NextResponse.json({message : ApiMessage.Error.General}, {status : 500})

    return NextResponse.json({status : 200});

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}
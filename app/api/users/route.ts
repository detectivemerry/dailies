import { NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { headers } from 'next/headers';

import { authOptions } from "../auth/[...nextauth]/auth";
import connectDB from "@/app/lib/mongodb";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    let data = await req.json();
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    // check if username already exists in database
    const userWithSameUsername = await db
      .collection("Users")
      .findOne({ username: data.username });
    if (userWithSameUsername) {
      return NextResponse.json(
        { message: "Username already exists in database" },
        { status: 400 }
      );
    }
    // check if email already exists in database
    const userWithSameEmail = await db
      .collection("Users")
      .findOne({ email: data.email });
    if (userWithSameEmail) {
      return NextResponse.json(
        { message: "Email already exists in database" },
        { status: 400 }
      );
    }

    const salt = await genSalt(12);
    const hashedPassword = await hash(data.password, salt);
    data.password = hashedPassword;
    data.goals = [];

    await db.collection("Users").insertOne(data);

    return NextResponse.json(
      { message: "Successful registration" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    let {
      endDate,
      startDate,
      frequencyCount,
      frequencyPeriod,
      name,
      _id,
    } = await req.json();

    const objectId = new ObjectId(String(_id)) ;
    //const headerList = headers();
    //const email = headerList.get('email')
    //const token = headerList.get('token')
    const session = await getServerSession(authOptions);
    //console.log(session)
    //return NextResponse.json({status : 200})
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    if(!session || !session.user){
      return NextResponse.json(
        { message: ApiMessage.Error.Unauthenticated },
        { status: 401 }
      );
    }
    //Add goal to user document
    const { user } = session;
    //const user = {email : "testuser@gmail.com"}
    const addGoalToUserResult = await db.collection("Users").updateOne(
      { email: user.email },
      {
        $push: {
          goals: {
            endDate: endDate,
            startDate: startDate,
            frequencyCount: frequencyCount,
            frequencyPeriod: frequencyPeriod,
            name: name,
            _id: objectId,
          },
        },
      }
    );
    const {acknowledged, modifiedCount} = addGoalToUserResult;

    // Increment GoalType no_of_members if user is a new member 
    const userDoc = await db.collection("Users").find({email : user.email}, {goals : 1}).next();
    const relatedGoals = userDoc.goals.filter((userGoal) => String(userGoal._id) === String(objectId));

    if(relatedGoals.length === 1){
      const updateNoOfMembersResult = await db.collection("GoalTypes").updateOne(
        {"goals._id" : objectId},
        {$inc : { "goals.$.no_of_members" : 1}}
      )

      if(updateNoOfMembersResult.modifiedCount != 1)
        console.error(`${_id}: no_of_members not incremented`)
    }

    if (acknowledged && modifiedCount === 1)
      return NextResponse.json(
        { message: ApiMessage.Success.General },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

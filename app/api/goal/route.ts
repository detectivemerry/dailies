import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import connectDB from "@/app/lib/mongodb";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    let { endDate, startDate, frequencyCount, frequencyPeriod, name, goalId, inactive } = await req.json()
    
    const goalIdObject = new ObjectId(String(goalId));
    const newIdObject = new ObjectId();

    const headerList = headers();
    const email = headerList.get("email");
    const accessToken = headerList.get("Authorization");

    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    
    // TO-DO: verify bearer token here
    const session = await getServerSession(authOptions);
    console.log("hey yea im at goal POST")
    console.log(session)
    if (!session || !session.user) {
      return NextResponse.json(
        { message: ApiMessage.Error.Unauthenticated },
        { status: 401 }
      );
    }
    //Add goal to user document
    const { user } = session;
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
            goalId : goalIdObject,
            _id: newIdObject,
            inactive : inactive,
          },
        },
      }
    );
    const { acknowledged, modifiedCount } = addGoalToUserResult;

    // Increment GoalType no_of_members if user is a new member
    const userDoc = await db
      .collection("Users")
      .find({ email: user.email }, { goals: 1 })
      .next();
    const relatedGoals = userDoc?.goals.filter(
      (userGoal) => String(userGoal._id) === String(goalId)
    );

    if (relatedGoals.length === 1) {
      const updateNoOfMembersResult = await db
        .collection("GoalTypes")
        .updateOne(
          { "goals._id": goalId },
          { $inc: { "goals.$.no_of_members": 1 } }
        );

      if (updateNoOfMembersResult.modifiedCount != 1)
        console.error(`${goalId}: no_of_members not incremented`);
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
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

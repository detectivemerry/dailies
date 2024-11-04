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
    let {
      endDate,
      startDate,
      frequencyCount,
      frequencyPeriod,
      name,
      goalId,
      streak,
      timesPostedCurrentPeriod,
      startOfCurrentPeriod,
      endOfCurrentPeriod,
      inactive,
      goalName,
    } = await req.json();

    const goalIdObject = new ObjectId(String(goalId));
    const endDateObject = new Date(endDate);
    const startDateObject = new Date(startDate);
    const startOfCurrentPeriodObject = new Date(startOfCurrentPeriod);
    const endOfCurrentPeriodObject = new Date(endOfCurrentPeriod) 
    
    const headerList = headers();
    const email = headerList.get("email");
    const accessToken = headerList.get("Authorization");

    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    // TO-DO: verify bearer token here
    const session = await getServerSession(authOptions);
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
            // endDate: endDate,
            // startDate: startDate,
            // startOfCurrentPeriod : startOfCurrentPeriod,
            // endOfCurrentPeriod :  endOfCurrentPeriod,
            _id : new ObjectId(),
            frequencyCount: Number(frequencyCount),
            frequencyPeriod: frequencyPeriod,
            name: name,
            goalId: goalIdObject,
            inactive: inactive,
            streak : streak,
            timesPostedCurrentPeriod : timesPostedCurrentPeriod,
            endDate : endDateObject,
            startDate : startDateObject,
            startOfCurrentPeriod : startOfCurrentPeriodObject,
            endOfCurrentPeriod : endOfCurrentPeriodObject,
            goalName : goalName
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

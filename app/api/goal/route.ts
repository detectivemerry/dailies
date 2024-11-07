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
    const endOfCurrentPeriodObject = new Date(endOfCurrentPeriod);

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
            _id: new ObjectId(),
            frequencyCount: Number(frequencyCount),
            frequencyPeriod: frequencyPeriod,
            name: name,
            goalId: goalIdObject,
            inactive: inactive,
            streak: streak,
            timesPostedCurrentPeriod: timesPostedCurrentPeriod,
            endDate: endDateObject,
            startDate: startDateObject,
            startOfCurrentPeriod: startOfCurrentPeriodObject,
            endOfCurrentPeriod: endOfCurrentPeriodObject,
            goalName: goalName,
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

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    let {
      startDate,
      endDate,
      name,
      frequencyCount,
      frequencyPeriod,
      startOfCurrentPeriod,
      endOfCurrentPeriod,
      originalUserGoal,
    } = await req.json();

    //let updateFields: {
    //"goals.$.name": string;
    //"goals.$.endDate"? : Date;
    //"goals.$.startDate"? : Date
    //"goals.$.frequencyCount"? : number;
    //"goals.$.frequencyPeriod"? : string;
    //"goals.$.startOfCurrentPeriod"? : Date;
    //"goals.$.endOfCurrentPeriod"? : Date;
    //"goals.$.streak"? : number;
    //} = {
    //"goals.$.name": name,
    //};

    // check if name was the only field changed, do not reset streak if true
    let updatedFrequency =
      startDate != originalUserGoal.startDate ||
      endDate != originalUserGoal.endDate ||
      frequencyCount != originalUserGoal.frequencyCount ||
      frequencyPeriod != originalUserGoal.frequencyPeriod ||
      startOfCurrentPeriod != originalUserGoal.startOfCurrentPeriod ||
      endOfCurrentPeriod != originalUserGoal.endOfCurrentPeriod;

    let updateFields: {
      name: string;
      startDate?: Date;
      endDate?: Date;
      frequencyCount?: number;
      frequencyPeriod?: string;
      startOfCurrentPeriod?: Date;
      endOfCurrentPeriod?: Date;
    } = {
      name: name,
    };

    if (updatedFrequency) {
      updateFields = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        frequencyCount: frequencyCount,
        frequencyPeriod: frequencyPeriod,
        startOfCurrentPeriod: new Date(startOfCurrentPeriod),
        endOfCurrentPeriod: new Date(endOfCurrentPeriod),
        ...updateFields,
      };
    }

    // TO-DO: verify bearer token here
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: ApiMessage.Error.Unauthenticated },
        { status: 401 }
      );
    }
    const { user } = session;

    const updatedUserGoal = await db
      .collection("Users")
      .updateOne({ email: user.email }, [
        {
          $set: {
            goals: {
              $map: {
                input: "$goals",
                in: {
                  $cond: {
                    if: { $eq: ["$$this._id", new ObjectId(String(originalUserGoal._id))] },
                    then: {
                      $mergeObjects: ["$$this", updateFields],
                    },
                    else: "$$this",
                  },
                },
              },
            },
          },
        },
      ]);

    console.log("yo we done update or wat AHAHHAHA");
    console.log(updatedUserGoal);

    return NextResponse.json(
      { message: ApiMessage.Success.General },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

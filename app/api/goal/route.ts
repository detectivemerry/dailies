import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import connectDB from "@/app/lib/mongodb";
import ApiMessage from "@/app/lib/message/ApiMessage";
import NotificationConfig from "@/app/lib/notificationConfig/notificationConfig";

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

    let subscribeSuccess = true;
    let sendNotificationSuccess = true;

    // Increment GoalType no_of_members if user is a new member
    const userDoc = await db
      .collection("Users")
      .find({ email: user.email }, { goals: 1 })
      .next();

    const subscribedCommunities = userDoc?.subscribedCommunities.filter(
      (community) => String(community.goalId) === String(goalId)
    );

    if (subscribedCommunities.length === 0) {
      const updateUserSubscribedCommunity = await db
        .collection("Users")
        .updateOne(
          { email: user.email },
          {
            $push: {
              subscribedCommunities: {
                _id: new ObjectId(),
                subscribedDateTime: new Date(),
                goalId: goalIdObject,
                name: goalName,
              },
            },
          },
          { upsert: true }
        );

      const updateNoOfMembersResult = await db
        .collection("GoalTypes")
        .updateOne(
          { "goals._id": goalIdObject },
          { $inc: { "goals.$.no_of_members": 1 } }
        );

      // send community subscribe notification to user
      const notification = await db.collection("Notifications").insertOne({
        _id: new ObjectId(),
        type: NotificationConfig.AutoCommunitySubscription.type,
        icon: NotificationConfig.AutoCommunitySubscription.icon,
        text: NotificationConfig.AutoCommunitySubscription.text.replace(/\*/g, goalName),
        buttonText: NotificationConfig.AutoCommunitySubscription.buttonText,
        path: NotificationConfig.AutoCommunitySubscription.path.replace(/\*/g, goalName),
        notifiedDateTime: new Date().toISOString(),
        seen: false,
        userId: userDoc?._id,
        username: session.user.username,
      });

      if (
        updateNoOfMembersResult.modifiedCount != 1 ||
        updateUserSubscribedCommunity.modifiedCount != 1
      ) {
        subscribeSuccess = false;
      }
      if (!notification.acknowledged) {
        sendNotificationSuccess = false;
      }
    }

    if (acknowledged && modifiedCount === 1)
      return NextResponse.json(
        {
          message:
            subscribeSuccess && sendNotificationSuccess
              ? ApiMessage.Success.General
              : subscribeSuccess
              ? ApiMessage.Error.UnsuccessfulNotficationSent
              : ApiMessage.Error.UnsuccessfulSubscription,
        },
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
                    if: {
                      $eq: [
                        "$$this._id",
                        new ObjectId(String(originalUserGoal._id)),
                      ],
                    },
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

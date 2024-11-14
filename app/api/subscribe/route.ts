import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

import { authOptions } from "../auth/[...nextauth]/auth";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { communityId } = await req.json();
    const goalId = new ObjectId(String(communityId));
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
    const { user } = session;
    // check if user is a new member, only new members can subscribe
    const userDoc = await db
      .collection("Users")
      .find({ email: user.email })
      .next();

    // console.log("user dog suubscribed communities")
    // console.log(userDoc?.subscribedCommunities)

    const subscribedCommunities = userDoc?.subscribedCommunities.filter(
      (community) => String(community.goalId) === String(goalId)
    );

    // console.log(subscribedCommunities)

    if (subscribedCommunities.length === 0) {
      // add community to user subscribedCommunities
      const addCommunity = await db.collection("Users").updateOne(
        {
          username: user.username,
        },
        {
          $push: {
            subscribedCommunities: {
              _id: new ObjectId(),
              subscribedDateTime: new Date(),
              goalId: goalId,
            },
          },
        },
        { upsert: true }
      );

      // console.log("add community");
      // console.log(addCommunity);

      // increment no_of_members
      const updateNoOfMembersResult = await db
        .collection("GoalTypes")
        .updateOne(
          { "goals._id": goalId },
          { $inc: { "goals.$.no_of_members": 1 } }
        );

      if (
        updateNoOfMembersResult.modifiedCount != 1 ||
        addCommunity.modifiedCount != 1
      ) {
        console.error(`${goalId}: no_of_members not incremented`);
        return NextResponse.json(
          { message: ApiMessage.Error.General },
          { status: 500 }
        );
      }

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json(
        { message: ApiMessage.Error.UserAlreadySubscribed },
        { status: 409 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, res: NextApiResponse) {
  try {
    const { communityId } = await req.json();
    const goalId = new ObjectId(String(communityId));
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
    const { user } = session;
    // check if user is a new member, only new members can subscribe
    const userDoc = await db
      .collection("Users")
      .find({ email: user.email })
      .next();

    const subscribedCommunities = userDoc?.subscribedCommunities.filter(
      (community) => String(community.goalId) === String(goalId)
    );

    if (subscribedCommunities.length === 0) {
      // add community to user subscribedCommunities
      const addCommunity = await db.collection("Users").updateOne(
        {
          username: user.username,
        },
        {
          $push: {
            subscribedCommunities: {
              _id: new ObjectId(),
              subscribedDateTime: new Date(),
              goalId: goalId,
            },
          },
        },
        { upsert: true }
      );

      // console.log("add community");
      // console.log(addCommunity);

      // increment no_of_members
      const updateNoOfMembersResult = await db
        .collection("GoalTypes")
        .updateOne(
          { "goals._id": goalId },
          { $inc: { "goals.$.no_of_members": 1 } }
        );

      if (
        updateNoOfMembersResult.modifiedCount != 1 ||
        addCommunity.modifiedCount != 1
      ) {
        console.error(`${goalId}: no_of_members not incremented`);
        return NextResponse.json(
          { message: ApiMessage.Error.General },
          { status: 500 }
        );
      }

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json(
        { message: ApiMessage.Error.UserAlreadySubscribed },
        { status: 409 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}
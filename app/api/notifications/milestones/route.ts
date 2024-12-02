import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    const data = await req.json();

    const goalsMilestone100 = data.goalsMilestone100.map(
      (goal) => new ObjectId(String(goal))
    );
    const goalsMilestone75 = data.goalsMilestone75.map(
      (goal) => new ObjectId(String(goal))
    );
    const goalsMilestone50 = data.goalsMilestone50.map(
      (goal) => new ObjectId(String(goal))
    );
    const goalsMilestone25 = data.goalsMilestone25.map(
      (goal) => new ObjectId(String(goal))
    );

    let results = [
      { goalsMilestone100Success: true },
      { goalsMilestone75Success: true },
      { goalsMilestone50Success: true },
      { goalsMilestone25Success: true },
    ];

    if (goalsMilestone100.length > 0) {
      const goalsMilestone100Result = await db.collection("Users").updateMany(
        {
          "goals._id": { $in: goalsMilestone100 },
        },
        {
          $set: { "goals.$[goal].milestoneReached": 100 },
        },
        {
          arrayFilters: [{ "goal._id": { $in: goalsMilestone100 } }],
        }
      );

      if (!goalsMilestone100Result.modifiedCount == goalsMilestone100.length) {
        results[0].goalsMilestone100Success = false;
      }
    }

    if (goalsMilestone75.length > 0) {
      const goalsMilestone75Result = await db.collection("Users").updateMany(
        {
          "goals._id": { $in: goalsMilestone75 },
        },
        {
          $set: { "goals.$[goal].milestoneReached": 75 },
        },
        {
          arrayFilters: [{ "goal._id": { $in: goalsMilestone75 } }],
        }
      );

      if (!goalsMilestone75Result.modifiedCount == goalsMilestone75.length) {
        results[1].goalsMilestone75Success = false;
      }
    }

    if (goalsMilestone50.length > 0) {
      const goalsMilestone50Result = await db.collection("Users").updateMany(
        {
          "goals._id": { $in: goalsMilestone50 },
        },
        {
          $set: { "goals.$[goal].milestoneReached": 50 },
        },
        {
          arrayFilters: [{ "goal._id": { $in: goalsMilestone50 } }],
        }
      );
      if (!goalsMilestone50Result.modifiedCount == goalsMilestone50.length) {
        results[2].goalsMilestone50Success = false;
      }
    }

    if (goalsMilestone25.length > 0) {
      const goalsMilestone25Result = await db.collection("Users").updateMany(
        {
          "goals._id": { $in: goalsMilestone25 },
        },
        {
          $set: { "goals.$[goal].milestoneReached": 25 },
        },
        {
          arrayFilters: [{ "goal._id": { $in: goalsMilestone25 } }],
        }
      );
      if (!goalsMilestone25Result.modifiedCount == goalsMilestone25.length) {
        results[3].goalsMilestone25Success = false;
      }
    }

    console.log(results);
    console.log(data.newNotifications);

    let message = "";
    let error = false;

    // send notifications
    if (Object.keys(data.newNotifications).length > 0) {
      const sendMilestoneNotifications = await db
        .collection("Notifications")
        .insertMany(data.newNotifications);

      if (!sendMilestoneNotifications.acknowledged) {
        error = true;
        message += ApiMessage.Error.UnsuccessfulNotficationSent;
      }
    }

    results.forEach((result) => {
      const typeSuccess = Object.entries(result);
      if (!typeSuccess[1]) {
        message += `Failed to update milestone notifications for ${typeSuccess[0]}. `;
        error = true;
      }
    });

    if (error) {
      return NextResponse.json({ message: message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

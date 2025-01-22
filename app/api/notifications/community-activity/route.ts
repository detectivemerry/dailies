import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import ApiMessage from "@/app/lib/message/ApiMessage";
import { NotificationGoal } from "@/types/model";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    const data = await req.json();

    let notifylist = data.notifyList.map((notification: NotificationGoal) => {
      return { ...notification, userId : new ObjectId(notification.userId)};
    });

    if (notifylist.length == 0)
      return NextResponse.json(
        { message: ApiMessage.Error.MissingNotificationList },
        { status: 400 }
      );

    const sendNotification = await db
      .collection("Notifications")
      .insertMany(notifylist);

    console.log(sendNotification)

    if (!sendNotification.acknowledged) {
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );
    }

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
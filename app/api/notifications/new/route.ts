import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiResponse } from "next";
import { headers } from "next/headers";

import ApiMessage from "@/app/lib/message/ApiMessage";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    const headerList = headers();
    const username = headerList.get("username");

    const notificationDocs = await db
      .collection("Notifications")
      .find({ username: username, seen: { $eq: false } })
      .toArray();

    return NextResponse.json({ data: notificationDocs }, { status: 200 });
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
    const headerList = headers();
    const username = headerList.get("username");

    const notifyResult = await db
      .collection("Notifications")
      .updateMany(
        { seen: { $eq: false }, username: username },
        { $set: { seen: true } }
      );

    if (!notifyResult.acknowledged)
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

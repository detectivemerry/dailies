import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/auth";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: ApiMessage.Error.Unauthenticated },
        { status: 401 }
      );
    }
    const { user } = session;

    const notificationDocs = await db.collection("Notifications").find({ username : user.username }).toArray();

    return NextResponse.json({data : notificationDocs}, {status : 200})

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

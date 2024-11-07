import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

import connectDB from "@/app/lib/mongodb";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const headerList = headers();
    const goalId = headerList.get("goalId");

    if (goalId === null)
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 404 }
      );
    const objectId = new ObjectId(goalId);

    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    
    const goalDoc = await db
      .collection("Users")
      .findOne({ goals: { $elemMatch : {_id : objectId}} },
        {projection : {"goals.$" : 1}}
      );

    if (!goalDoc) {
      return NextResponse.json(
        { message: ApiMessage.Error.NoUserGoalFound },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: goalDoc }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

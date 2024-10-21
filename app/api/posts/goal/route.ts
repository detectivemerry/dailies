import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ApiMessage from "@/app/lib/message/ApiMessage";
import { decryptData } from "@/app/lib/encryption/encryption";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const encryptedGoalId: string = await req.json();
    const goalId = decryptData(encryptedGoalId);

    const listOfPosts = await db
      .collection("Posts")
      .find({ goalId: goalId })
      .toArray();

    return NextResponse.json({ data: listOfPosts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

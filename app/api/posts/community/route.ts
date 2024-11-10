import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ApiMessage from "@/app/lib/message/ApiMessage";
import { headers } from "next/headers";

export async function GET(req: Request, res: NextApiResponse) {
  try {

    const headerList = headers();
    const communityName = decodeURI(String(headerList.get("community-name")));
    console.log(` name : ${communityName}`)
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    const listOfPosts = await db
      .collection("Posts")
      .find({ goalName: communityName })
      .toArray();

    return NextResponse.json({ data: listOfPosts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

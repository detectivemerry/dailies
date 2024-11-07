import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    const listOfPosts = await db
      .collection("Posts")
      .find({})
      .toArray();

      if(!listOfPosts){
        return NextResponse.json({message : `Posts not found.`}, {status : 400})
      }

    return NextResponse.json({ data: listOfPosts }, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const goalTypes = await db.collection("GoalTypes").find().toArray();

    if(!goalTypes){
      return NextResponse.json({message : ApiMessage.Error.noGoalType}, {status : 500})
    }

    return NextResponse.json({data : goalTypes}, {status : 200})

  } catch (error) {
    return NextResponse.json({ message : ApiMessage.Error.default}, { status: 500 });
  }
}
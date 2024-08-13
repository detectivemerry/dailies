import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const goalTypes = await db.collection("GoalTypes").find().toArray();

    if(!goalTypes){
      return NextResponse.json({message : "No goal types found."}, {status : 500})
    }

    return NextResponse.json({data : goalTypes}, {status : 200})

  } catch (error) {
    return NextResponse.json({ message : "An unexpected error occured"}, { status: 500 });
  }
}
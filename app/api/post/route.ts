import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import { match } from "assert";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    let data = await req.json();
    const session = await getServerSession(authOptions);
    const filter = {email : session?.user.email, 'goals._id' : data.goalId}
    const options = { upsert : true }
    const update = {
      $push : {
        'goals.$.posts' : data
      }
    }
    const result = await db.collection("Users").updateOne(filter, data, options);

    const {matchedCount, modifiedCount} = result;

    if(matchedCount === 0){
      return NextResponse.json({message : ApiMessage.Error.NoUserFound}, {status : 500})
    }
    if(modifiedCount === 0){
      return NextResponse.json({message : ApiMessage.Error.General}, {status : 500})
    }

    return NextResponse.json({status : 200})
    
  } catch (error) {

    console.log(error)
    return NextResponse.json({ message : ApiMessage.Error.General}, { status: 500 });
  }
}

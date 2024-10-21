import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import ApiMessage from "@/app/lib/message/ApiMessage";
import { headers } from 'next/headers'

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const headerList = headers();
    const username = headerList.get('username')
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const session = await getServerSession(authOptions);
    const filter = { username: username };
    const userDoc = await db
      .collection("Users")
      .findOne(filter, {projection : { goals: 1, _id : 0} });

    if (!userDoc) {
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: userDoc }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

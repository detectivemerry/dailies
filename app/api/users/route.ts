import { NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    let data = await req.json();
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    // check if username already exists in database
    const userWithSameUsername = await db
      .collection("Users")
      .findOne({ username: data.username });
    if (userWithSameUsername) {
      return NextResponse.json(
        { message: "Username already exists in database" },
        { status: 400 }
      );
    }
    // check if email already exists in database
    const userWithSameEmail = await db
      .collection("Users")
      .findOne({ email: data.email });
    if (userWithSameEmail) {
      return NextResponse.json(
        { message: "Email already exists in database" },
        { status: 400 }
      );
    }

    const salt = await genSalt(12);
    const hashedPassword = await hash(data.password, salt);
    data.password = hashedPassword;
    data.goals = [];

    await db.collection("Users").insertOne(data);

    return NextResponse.json(
      { message: "Successful registration" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    let {
      endDate,
      startDate,
      frequencyCount,
      frequencyPeriod,
      goalName,
      goal_id,
    } = await req.json();

    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
      return NextResponse.json(
        { message: ApiMessage.Error.Unauthenticated },
        { status: 401 }
      );
    }

    const { user } = session;

    const result = await db.collection("Users").updateOne(
      { email: user.email },
      {
        $push: {
          goals: {
            endDate: endDate,
            startDate: startDate,
            frequencyCount: frequencyCount,
            frequencyPeriod: frequencyPeriod,
            goalName: goalName,
            goal_id: goal_id,
          },
        },
      }
    );
    const {acknowledged, modifiedCount} = result;

    if (acknowledged && modifiedCount === 1)
      return NextResponse.json(
        { message: ApiMessage.Success.General },
        { status: 200 }
      );
    else
      return NextResponse.json(
        { message: ApiMessage.Error.General },
        { status: 500 }
      );

  } catch (error) {
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { headers } from 'next/headers';
import { getToken } from "next-auth/jwt";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import connectDB from "@/app/lib/mongodb";
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
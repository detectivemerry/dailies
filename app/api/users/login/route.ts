import bcrypt from "bcrypt";
import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import ApiMessage from "@/app/lib/message/ApiMessage";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    console.log("yo we in users/login POST")
    let { email, password } = await req.json();
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    const user = await db.collection("Users").findOne({ email: email });
    
    if (!user){
      return NextResponse.json(
        { message: ApiMessage.Error.InvalidCredentials },
        { status: 400 }
      );
    } 
    const passwordMatch = await bcrypt.compare(password, user.password);
    // TO-DO: Generate token and send to DB
    //const jwt = require('jsonwebtoken');
    //const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)

    if (passwordMatch) {
      user.token = "topsecret"
      return NextResponse.json(
        { message: ApiMessage.Success.General, user : user},
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: ApiMessage.Error.InvalidCredentials },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: ApiMessage.Error.General },
      { status: 500 }
    );
  }
}

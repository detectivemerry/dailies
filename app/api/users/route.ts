import { NextResponse } from "next/server";
import { genSalt, hash } from 'bcrypt';
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import ApiMessage from "@/app/lib/message/ApiMessage";

// Create new user (register)
export async function POST(req: Request, res: NextApiResponse) {
  try {
    let data = await req.json();
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);
    // check if username already exists in database
    const userWithSameUsername = await db.collection("Users").findOne({username : data.username})
    if(userWithSameUsername){
      return NextResponse.json({message : ApiMessage.Error.duplicateUsername}, {status : 400})
    }
    // check if email already exists in database
    const userWithSameEmail = await db.collection("Users").findOne({email : data.email})
    if(userWithSameEmail){
      return NextResponse.json({message : ApiMessage.Error.duplicateEmail}, {status : 400})
    }

    const salt = await genSalt(12);
    const hashedPassword = await hash(data.password, salt);
    data.password = hashedPassword;

    await db.collection("Users").insertOne(data);

    return NextResponse.json({message : ApiMessage.Success.registerUser}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message : ApiMessage.Error.default}, { status: 500 });
  }
}

// Get user details by username
export async function GET(req: Request, res: NextApiResponse) {
  try {
    let data = await req.json();
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const user = await db.collection("Users").findOne({username : data.username});

    if(!user){
      return NextResponse.json({message : ApiMessage.Error.noUser}, {status : 400})
    }

    return NextResponse.json({data : user}, {status : 200})

  } catch (error) {
    return NextResponse.json({ message : ApiMessage.Error.default}, { status: 500 });
  }
}

// Update user details
export async function PUT(req: Request, res: NextApiResponse) {
  try {
    let data = await req.json();
    const client = await connectDB();
    const db = client.connection.useDb(`Dailies`);

    const salt = await genSalt(12);
    const hashedPassword = await hash(data.password, salt);
    data.password = hashedPassword;

    const updateUser = await db.collection("Users").updateOne({_id : data._id}, data)
    if(!updateUser.matchedCount){
      return NextResponse.json({message : ApiMessage.Error.noUser}, {status : 400})
    }

    return NextResponse.json({message : ApiMessage.Success.updateUser}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message : ApiMessage.Error.default}, { status: 500 });
  }
}
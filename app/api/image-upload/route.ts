import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";


import parseFile from "./fileParser"

export async function POST(req: Request, res: NextApiResponse) {
    
    //let data = await req.json();
    //console.log("we are in route")
    //console.log(`my key : ${process.env.AWS_ACCESS_KEY_ID}`)
    //const { u}
    return NextResponse.json({status : 200})
}
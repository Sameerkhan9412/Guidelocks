import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const admin = await Admin.findOne({
    email: body.email,
    password: body.password
  });

  if (!admin) {

    return NextResponse.json({
      success:false,
      message:"Invalid credentials"
    });

  }

  return NextResponse.json({
    success:true
  });

}
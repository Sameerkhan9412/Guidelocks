import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req: Request) {

  try {

    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {

      return NextResponse.json({
        success: false,
        message: "Email and password required"
      });

    }
    console.log("emal",email)
    console.log("emal",password)

    const admin = await Admin.findOne({
      email,
      password
    });

    if (!admin) {

      return NextResponse.json({
        success: false,
        message: "Invalid credentials"
      });

    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful"
    });

    /* set auth cookie */

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      secure: false
    });

    return response;

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Server error"
    });

  }

}
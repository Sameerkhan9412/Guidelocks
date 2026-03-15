import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SubCategory from "@/models/SubCategory";

export async function GET() {

  await connectDB();

  const subcategories = await SubCategory
    .find()
    .populate("category");

  return NextResponse.json({
    success: true,
    data: subcategories
  });

}

export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();

    const { name, category } = body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const subcategory = await SubCategory.create({
      name,
      slug,
      category
    });

    return NextResponse.json({
      success: true,
      data: subcategory
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Failed to create subcategory"
    });

  }

}
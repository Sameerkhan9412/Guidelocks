import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import fs from "fs";
import path from "path";
export const runtime = "nodejs";

export async function GET() {

  await connectDB();

  const categories = await Category.find().sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: categories
  });

}


export async function POST(req: Request) {

  try {

    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File | null;
    console.log("path,,",image)

    if (!name) {
      return NextResponse.json({
        success: false,
        message: "Category name required"
      });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    let imageUrl = "";

    if (image && image.size > 0) {

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public/uploads/categories"
      );

      // create folder if missing
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + image.name;

      const uploadPath = path.join(uploadDir, fileName);

      fs.writeFileSync(uploadPath, buffer);

      imageUrl = `/uploads/categories/${fileName}`;
    }
    console.log("imagurlee",imageUrl)

    const category = await Category.create({
      name,
      slug,
      image:imageUrl
    });

    return NextResponse.json({
      success: true,
      data: category
    });

  } catch (error) {

    console.error("CATEGORY ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to create category"
    });

  }

}
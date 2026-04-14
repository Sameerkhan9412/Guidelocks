export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lock from "@/models/Lock";
import cloudinary from "@/lib/cloudinary";

// GET LOCKS
export async function GET() {
  try {
    await connectDB();

    const locks = await Lock.find()
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: locks,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Failed to fetch locks",
    });
  }
}

// CREATE LOCK
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;

    const featuresRaw = formData.get("features");

    let features: string[] = [];

    if (featuresRaw) {
      features = JSON.parse(featuresRaw as string);
    }

    const files = formData.getAll("images") as File[];

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    let imageUrls: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = buffer.toString("base64");

      const dataURI = `data:${file.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "locks",
      });

      imageUrls.push(uploadRes.secure_url);
    }

    const lock = await Lock.create({
      name,
      slug,
      description,
      category,
      features,
      images: imageUrls,
    });

    return NextResponse.json({
      success: true,
      data: lock,
    });
  } catch (error) {
    console.log("LOCK CREATE ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to create lock",
    });
  }
}
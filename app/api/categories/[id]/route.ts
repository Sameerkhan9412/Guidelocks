export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import fs from "fs";
import path from "path";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const { id } = await context.params;

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File | null;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    let updateData: any = { name, slug };

    if (image && image.size > 0) {

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public/uploads/categories"
      );

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = Date.now() + "-" + image.name;

      const uploadPath = path.join(uploadDir, fileName);

      fs.writeFileSync(uploadPath, buffer);

      updateData.image = `/uploads/categories/${fileName}`;
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: "after" }
    );

    return NextResponse.json({
      success: true,
      data: updated
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Failed to update category"
    });

  }

}
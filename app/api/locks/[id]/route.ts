export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lock from "@/models/Lock";
import fs from "fs";
import path from "path";


/* UPDATE LOCK */

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const { id } = await context.params;

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const subcategory = formData.get("subcategory") as string;

    const featuresRaw = formData.get("features");

    let features:string[] = [];

    if(featuresRaw){
      features = JSON.parse(featuresRaw as string);
    }

    const files = formData.getAll("images") as File[];

    const slug = name.toLowerCase().replace(/\s+/g,"-");

    let imageUrls:string[] = [];

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/locks"
    );

    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir,{recursive:true});
    }


    for(const file of files){

      if(!file || file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName =
      Date.now() + "-" + file.name;

      const uploadPath =
      path.join(uploadDir,fileName);

      fs.writeFileSync(uploadPath,buffer);

      imageUrls.push(`/uploads/locks/${fileName}`);

    }


    const updateData:any = {

      name,
      slug,
      description,
      category,
      subcategory,
      features

    };


    if(imageUrls.length > 0){
      updateData.images = imageUrls;
    }


    const updated = await Lock.findByIdAndUpdate(

      id,
      updateData,
      { returnDocument:"after" }

    );


    return NextResponse.json({

      success:true,
      data:updated

    });


  } catch(error){

    console.log("UPDATE LOCK ERROR:",error);

    return NextResponse.json({

      success:false,
      message:"Failed to update lock"

    });

  }

}



 /* DELETE LOCK */


export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    await connectDB();

    const { id } = await context.params;

    const lock = await Lock.findById(id);

    if(!lock){

      return NextResponse.json({

        success:false,
        message:"Lock not found"

      });

    }


    /* DELETE IMAGES FROM SERVER */

    if(lock.images){

      lock.images.forEach((img:string)=>{

        const filePath = path.join(
          process.cwd(),
          "public",
          img
        );

        if(fs.existsSync(filePath)){
          fs.unlinkSync(filePath);
        }

      });

    }


    await Lock.findByIdAndDelete(id);


    return NextResponse.json({

      success:true,
      message:"Lock deleted"

    });


  } catch(error){

    console.log("DELETE LOCK ERROR:",error);

    return NextResponse.json({

      success:false,
      message:"Failed to delete lock"

    });

  }

}
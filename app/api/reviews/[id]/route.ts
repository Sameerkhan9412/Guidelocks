import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db";
import Review from "@/models/Review";

export async function DELETE(
req:Request,
context:{params:Promise<{id:string}>}
){

try{

await connectDB();

const {id} = await context.params;

await Review.findByIdAndDelete(id);

return NextResponse.json({

success:true,
message:"Review deleted"

});

}catch(error){

console.log(error);

return NextResponse.json({

success:false,
message:"Failed to delete review"

});

}

}
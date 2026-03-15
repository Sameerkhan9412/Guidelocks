import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db";
import Review from "@/models/Review";

export async function GET(){

await connectDB();

const reviews = await Review.find()
.sort({createdAt:-1});

return NextResponse.json({
success:true,
data:reviews
});

}


export async function POST(req:Request){

try{

await connectDB();

const body = await req.json();

const {name,message,rating} = body;

const review = await Review.create({

name,
message,
rating

});

return NextResponse.json({

success:true,
data:review

});

}catch(error){

console.log(error);

return NextResponse.json({

success:false,
message:"Failed to create review"

});

}

}
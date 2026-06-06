import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db";
import Review from "@/models/Review";

function noStoreHeaders() {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
  };
}

export async function GET(){

await connectDB();

const reviews = await Review.find()
.sort({createdAt:-1});

return NextResponse.json(
{
  success: true,
  data: reviews,
},
{ headers: noStoreHeaders() }
);


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

}, { headers: noStoreHeaders() });

}catch(error){

console.log(error);

return NextResponse.json({

success:false,
message:"Failed to create review"

}, { headers: noStoreHeaders() });

}

}


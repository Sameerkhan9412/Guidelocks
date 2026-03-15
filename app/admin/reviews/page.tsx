"use client";

import {useEffect,useState} from "react";

export default function ReviewsPage(){

const[name,setName] = useState("");
const[message,setMessage] = useState("");
const[rating,setRating] = useState(5);

const[reviews,setReviews] = useState<any[]>([]);


useEffect(()=>{
loadReviews();
},[]);


const loadReviews = async()=>{

const res = await fetch("/api/reviews");
const data = await res.json();

setReviews(data.data);

};


const addReview = async()=>{

await fetch("/api/reviews",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
message,
rating
})

});

setName("");
setMessage("");
setRating(5);

loadReviews();

};


const deleteReview = async(id:string)=>{

if(!confirm("Delete review?")) return;

await fetch(`/api/reviews/${id}`,{
method:"DELETE"
});

loadReviews();

};


return(

<div className="p-10">

<h1 className="text-2xl font-bold mb-6">
Manage Reviews
</h1>


{/* ADD REVIEW */}

<div className="border p-6 mb-10 space-y-4">

<input
placeholder="Client Name"
className="border p-2 w-full"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<textarea
placeholder="Review Message"
className="border p-2 w-full"
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>


<select
className="border p-2"
value={rating}
onChange={(e)=>setRating(Number(e.target.value))}
>

<option value="5">5 Stars</option>
<option value="4">4 Stars</option>
<option value="3">3 Stars</option>
<option value="2">2 Stars</option>
<option value="1">1 Star</option>

</select>


<button
onClick={addReview}
className="bg-black text-white px-6 py-2"
>
Add Review
</button>

</div>



{/* REVIEW LIST */}

<div className="grid grid-cols-3 gap-6">

{reviews.map((review)=>(
<div
key={review._id}
className="border p-4 rounded"
>

<h3 className="font-semibold">
{review.name}
</h3>

<p className="text-sm text-gray-500 mb-2">
⭐ {review.rating}/5
</p>

<p className="text-sm">
{review.message}
</p>

<button
onClick={()=>deleteReview(review._id)}
className="text-red-500 mt-3"
>
Delete
</button>

</div>
))}

</div>


</div>

)

}
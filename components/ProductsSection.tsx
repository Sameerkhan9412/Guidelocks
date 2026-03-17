"use client";

import { useEffect,useState } from "react";

export default function ProductsSection(){

const[locks,setLocks] = useState([]);

useEffect(()=>{

fetch("/api/locks")
.then(res=>res.json())
.then(data=>setLocks(data.data));

},[]);

return(

<section id="products" className="py-16">

<div className="max-w-7xl mx-auto">

<h2 className="text-3xl font-bold mb-10 text-center">
New Products
</h2>

<div className="grid grid-cols-4 gap-6">

{locks.slice(0,8).map((lock:any)=>(
<div key={lock._id} className="border p-4 rounded">

<img
src={lock.images?.[0]}
className="h-40 w-full object-cover mb-3"
/>

<h3 className="font-semibold">
{lock.name}
</h3>

</div>
))}

</div>

</div>

</section>

)

}
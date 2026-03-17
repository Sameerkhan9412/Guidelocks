"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesSection(){

const[categories,setCategories] = useState([]);
const router = useRouter();

useEffect(()=>{

fetch("/api/categories")
.then(res=>res.json())
.then(data=>setCategories(data.data));

},[]);

return(

<section id="categories" className="py-16 bg-light">

<div className="max-w-7xl mx-auto">

<h2 className="text-3xl font-bold mb-10 text-center">
Categories
</h2>

<div className="grid grid-cols-4 gap-6">

{categories.map((cat:any)=>(
<div
key={cat._id}
onClick={()=>router.push(`/category/${cat.slug}`)}
className="cursor-pointer bg-white p-4 shadow rounded hover:shadow-lg transition"
>

<img
src={cat.image}
className="h-40 w-full object-cover rounded"
/>

<h3 className="mt-3 font-semibold text-center">
{cat.name}
</h3>

</div>
))}

</div>

</div>

</section>

)

}
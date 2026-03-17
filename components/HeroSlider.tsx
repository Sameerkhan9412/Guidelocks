"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const slides = [
"/hero/1.jpg",
"/hero/2.jpg",
"/hero/3.jpg",
"/hero/4.jpg"
];

export default function HeroSlider(){

const [index,setIndex] = useState(0);

const next = ()=>{

setIndex((prev)=>(prev+1)%slides.length)

};

return(

<section className="relative h-[500px] overflow-hidden">

<motion.img
key={slides[index]}
src={slides[index]}
initial={{opacity:0,scale:1.1}}
animate={{opacity:1,scale:1}}
transition={{duration:0.8}}
className="absolute w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">

<h1 className="text-4xl font-bold mb-4">
Premium Security Locks
</h1>

<p className="text-lg mb-6">
Strong. Secure. Reliable.
</p>

<button
onClick={next}
className="bg-gold text-black px-6 py-3 rounded"
>
Next
</button>

</div>

</section>

)

}
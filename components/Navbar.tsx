"use client";

import Link from "next/link";

export default function Navbar(){

return(

<header className="bg-white shadow">

<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

<h1 className="text-2xl font-bold text-primary">
LOCK<span className="text-gold">STORE</span>
</h1>

<nav className="flex gap-6 text-sm">

<Link href="/">Home</Link>
<Link href="#categories">Categories</Link>
<Link href="#products">Products</Link>
<Link href="#reviews">Reviews</Link>
<Link href="#contact">Contact</Link>

</nav>

</div>

</header>

)

}
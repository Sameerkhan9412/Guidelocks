import Link from "next/link";

export default function Dashboard(){

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-10">
Admin Dashboard
</h1>

<div className="grid grid-cols-3 gap-6">

<Link
href="/admin/add-lock"
className="border p-6"
>
Add Lock
</Link>

<Link
href="/admin/locks"
className="border p-6"
>
Manage Locks
</Link>

<Link
href="/admin/reviews"
className="border p-6"
>
Manage Reviews
</Link>

</div>

</div>

)

}
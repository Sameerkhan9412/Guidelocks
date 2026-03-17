export default function BrandsSection(){

const brands=[
"/brands/1.png",
"/brands/2.png",
"/brands/3.png",
"/brands/4.png"
]

return(

<section className="py-16 bg-light">

<h2 className="text-3xl text-center mb-10">
Brands
</h2>

<div className="flex justify-center gap-10">

{brands.map((b,i)=>(
<img key={i} src={b} className="h-12"/>
))}

</div>

</section>

)

}
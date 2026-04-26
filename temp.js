// // const nums=[1,2,3,4];
// // const multi=nums.map((ele,index)=>{
// //     return ele*3;
// // })
// // console.log(multi)
// // const demo=multi.filter((ele,index)=>{
// //     return ele%2==0;
// // })

const { mark } = require("framer-motion/client");

  
// // console.log(demo)


// Array.prototype.myMap=function(cb){
//     let temp=[];
//     for(let i=0;i<this.length;i++){
//         temp.push(cb(this[i],i));
//     }  
//     return temp;
// }

// const nums=[1,2,3,4];
// const multi=nums.myMap((ele,index)=>{
//     return ele*3;
// })

// console.log("dkd",multi)

const students=[
    {name:"sameer",roll:31,mark:80},
    {name:"khan",roll:15,mark:69},
    {name:"Kaushal",roll:16,mark:35},
    {name:"dilpreet",roll:7,mark:55}
]

const data=students.filter((st)=>{
    if(st.mark>60) return st.name;

})
console.log("snsn",data)


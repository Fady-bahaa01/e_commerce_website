import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function useGoBackAnimation(ref){

useGSAP(()=>{
    if(!ref.current) return;
const enter=()=>{

gsap.to(ref.current,{

x:8,

color:"#D87D4A",

duration:.3

});

};

const leave=()=>{

gsap.to(ref.current,{

x:0,

color:"#777",

duration:.3

});

};

ref.current.addEventListener("mouseenter",enter);

ref.current.addEventListener("mouseleave",leave);

return()=>{
ref.current.removeEventListener("mouseenter",enter);

ref.current.removeEventListener("mouseleave",leave);

};

});

}
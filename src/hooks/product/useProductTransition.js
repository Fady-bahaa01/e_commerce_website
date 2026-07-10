import { useEffect } from "react";

export default function useProductTransition(productId){

useEffect(()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

},[productId]);

}
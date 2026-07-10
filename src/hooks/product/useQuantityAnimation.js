import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function useQuantityAnimation({
  plusRef,
  minusRef,
  quantityNumberRef,
}) {
  useGSAP(() => {
    if (!plusRef.current) return;

    const animate = () => {

      gsap.fromTo(
        quantityNumberRef.current,
        {
          y:-8,
          opacity:.4
        },
        {
          y:0,
          opacity:1,
          duration:.28,
          ease:"power2.out"
        }
      );

    };

    plusRef.current.addEventListener("click",animate);

    minusRef.current.addEventListener("click",animate);

    return ()=>{

      plusRef.current?.removeEventListener("click",animate);

      minusRef.current?.removeEventListener("click",animate);

    };

  });
}
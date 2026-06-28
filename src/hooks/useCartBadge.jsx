import { useEffect } from "react";
import gsap from "gsap";

export default function useCartBadge(ref, value) {
  useEffect(() => {
    if (!ref.current) return;
    if (value === 0) return;

    gsap.fromTo(
      ref.current,
      {
        scale: 0,
        y: -6,
        opacity: 0,
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(3)",
      },
    );
  }, [value, ref]);
}

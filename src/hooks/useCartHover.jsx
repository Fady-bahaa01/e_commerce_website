import { useEffect } from "react";
import gsap from "gsap";

export default function useCartHover(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const enter = () => {
      gsap.to(el, {
        scale: 1.1,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [ref]);
}

import { useRef } from "react";
import gsap from "gsap";

export default function useAddToCartAnimation() {
  const buttonRef = useRef(null);

  const animate = () => {
    if (!buttonRef.current) return;

    const tl = gsap.timeline();

    tl.to(buttonRef.current, {
      scale: 0.93,
      duration: 0.1,
    })
      .to(buttonRef.current, {
        scale: 1.08,
        duration: 0.18,
        ease: "back.out(4)",
      })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.15,
      });

    const originalText = buttonRef.current.innerHTML;

    buttonRef.current.innerHTML = "✓ ADDED";

    gsap.to(buttonRef.current, {
      backgroundColor: "#22c55e",
      duration: 0.25,
    });

    setTimeout(() => {
      if (!buttonRef.current) return;

      buttonRef.current.innerHTML = originalText;

      gsap.to(buttonRef.current, {
        backgroundColor: "#D87D4A",
        duration: 0.3,
      });
    }, 1400);
  };

  return {
    buttonRef,
    animate,
  };
}
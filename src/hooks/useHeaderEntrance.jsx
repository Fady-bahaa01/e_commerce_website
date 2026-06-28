import { useEffect } from "react";
import gsap from "gsap";

export default function useHeaderEntrance(logo, navItems, cart, category) {
  useEffect(() => {
    if (!category.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      tl.from(logo.current, {
        y: -50,
        opacity: 0,
        duration: 1,
      })
        .from(
          navItems.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.9,
            stagger: 0.06,
          },
          "-=0.6",
        )
        .from(
          cart.current,
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        );
    });

    return () => ctx.revert();
  }, [category, logo, navItems, cart]);
}

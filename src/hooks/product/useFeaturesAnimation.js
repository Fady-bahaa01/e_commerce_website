import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useFeaturesAnimation(
  featuresRef,
  inTheBoxRef,
  productId
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(featuresRef.current, {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 75%",
        },
      });

      gsap.from(inTheBoxRef.current, {
        opacity: 0,
        x: 80,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: inTheBoxRef.current,
          start: "top 75%",
        },
      });
    });

    return () => ctx.revert();
  }, [productId]);
}
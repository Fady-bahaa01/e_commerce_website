import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useSectionTitleAnimation(ref) {
  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      letterSpacing: "12px",
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
    });
  });
}
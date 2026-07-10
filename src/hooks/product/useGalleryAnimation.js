import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGalleryAnimation() {
  useLayoutEffect(() => {
    const cards = gsap.utils.toArray(".gallery-item");

    gsap.from(cards, {
      opacity: 0,
      y: 70,
      scale: 0.95,
      duration: 1,
      stagger: 0.18,
      ease: "expo.out",
      scrollTrigger: {
        trigger: cards[0],
        start: "top 85%",
      },
    });
  }, []);
}
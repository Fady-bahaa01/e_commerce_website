import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useSuggestionAnimation() {
  useLayoutEffect(() => {
    const cards = gsap.utils.toArray(".suggestion-card");

    gsap.from(cards, {
      opacity: 0,
      y: 60,
      scale: 0.96,
      stagger: 0.18,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: cards[0],
        start: "top 80%",
      },
    });
  }, []);
}
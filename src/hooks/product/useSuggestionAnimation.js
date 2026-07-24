import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useSuggestionAnimation(
  suggestionsRef,
  cardsRef,
  titleRef,
  cardsLength,
) {
  useGSAP(
    () => {
      if (!suggestionsRef.current) return;
      if (!cardsRef.current.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: suggestionsRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "expo.out",
      }).from(
        cardsRef.current,
        {
          opacity: 0,
          y: 70,
          stagger: 0.18,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.35",
      );

      return () => {
        tl.scrollTrigger?.kill();
      };
    },
    { dependencies: [cardsLength], scope: suggestionsRef },
  );
}
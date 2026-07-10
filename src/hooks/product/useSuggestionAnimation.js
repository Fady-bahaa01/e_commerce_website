import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useSuggestionAnimation(
  suggestionsRef,
  cardsRef,
  titleRef,
  productId,
) {
  useGSAP(() => {
    if (!suggestionsRef.current) return;

    const tl = gsap.timeline({

      scrollTrigger: {

        trigger: suggestionsRef.current,

        start: "top 75%",

      },

    });

    tl.from(titleRef.current,{

      opacity:0,

      y:40,

      duration:.8,

      ease:"expo.out"

    })

    .from(cardsRef.current,{

      opacity:0,

      y:70,

      stagger:.18,

      duration:.8,

      ease:"expo.out"

    },"-=.35");

  },[productId]);
}
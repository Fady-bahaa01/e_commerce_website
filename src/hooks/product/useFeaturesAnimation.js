import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useFeaturesAnimation({
  featuresRef,
  featureParagraphRef,
  boxRef,
  boxItemsRef,
}) {
  useGSAP(() => {
    if (!featuresRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 75%",
      },
    });

    tl.from(featuresRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
    })

      .from(
        featureParagraphRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.45",
      )

      .from(
        boxRef.current,
        {
          opacity: 0,
          x: 50,
          duration: 0.7,
        },
        "-=0.5",
      )

      .from(
        boxItemsRef.current,
        {
          opacity: 0,
          x: 20,
          stagger: 0.12,
          duration: 0.35,
        },
        "-=0.35",
      );
  });
}
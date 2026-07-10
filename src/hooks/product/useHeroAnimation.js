import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function useHeroAnimation(
  imageRef,
  titleRef,
  descriptionRef,
  priceRef,
  quantityRef,
  addToCartRef,
  productId,
) {
  useGSAP(() => {
    if (!imageRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "expo.out",
      },
    });

    tl.from(imageRef.current, {
      opacity: 0,
      scale: 0.85,
      x: -80,
      filter: "blur(10px)",
      duration: 1.2,
    })
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: 60,
          duration: 0.8,
        },
        "-=0.8",
      )
      .from(
        descriptionRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.55",
      )
      .from(
        priceRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.4",
      )
      .from(
        quantityRef.current,
        {
          opacity: 0,
          x: -30,
          duration: 0.45,
        },
        "-=0.3",
      )
      .from(
        addToCartRef.current,
        {
          opacity: 0,
          x: 30,
          duration: 0.45,
        },
        "-=0.35",
      );
  }, [productId]);
}
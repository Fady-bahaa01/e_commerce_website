import { useLayoutEffect } from "react";
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
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.out",
        },
      });

      tl.from(imageRef?.current, {
        opacity: 0,
        scale: 0.88,
        x: -80,
        duration: 1.3,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 60,
            duration: 0.9,
          },
          "-=0.9"
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.65"
        )
        .from(
          priceRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.55"
        )
        .from(
          [quantityRef.current, addToCartRef.current],
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.5,
          },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, [productId]);
}
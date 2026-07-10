import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGalleryAnimation(
  galleryRef,
  galleryImagesRef,
  productId,
) {
  useGSAP(() => {
    if (!galleryRef.current) return;

    gsap.from(galleryImagesRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.94,
      duration: 1,
      stagger: 0.18,
      ease: "expo.out",

      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 75%",
      },
    });
  }, [productId]);
}
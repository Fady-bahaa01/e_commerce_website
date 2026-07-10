import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function useGalleryHover(imagesRef) {
  useGSAP(() => {
    imagesRef?.current.forEach((img) => {
      if (!img) return;

      const enter = () => {
        gsap.to(img, {
          scale: 1.03,
          duration: .45,
          ease: "power3.out",
        });
      };

      const leave = () => {
        gsap.to(img, {
          scale: 1,
          duration: .45,
        });
      };

      img.addEventListener("mouseenter", enter);
      img.addEventListener("mouseleave", leave);
    });
  });
}
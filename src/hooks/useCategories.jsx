import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function useCategories(cardsRef, heroRef, items) {
  useEffect(() => {
    if (!items.length) return;

    gsap.fromTo(
      heroRef.current,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
      },
    );

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const image = card.querySelector(".product-image");
      const content = card.querySelector(".product-content");

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 120,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        image,
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        content.children,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        },
      );

      gsap.to(image, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [items]);
}

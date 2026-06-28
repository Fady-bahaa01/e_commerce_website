import gsap from "gsap";
import { useEffect } from "react";

export default function useMainLayout(
  menuRef,
  cartRef,
  overlayRef,
  value,
  state,
) {
  useEffect(() => {
    gsap.set(cartRef.current, {
      xPercent: 120,
    });

    gsap.set(overlayRef.current, {
      opacity: 0,
      pointerEvents: "none",
    });
  }, []);

  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";

      gsap.to(cartRef.current, {
        xPercent: -6,
        duration: 1,
        ease: "expo.out",
      });

      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
      });

      gsap.fromTo(
        ".cart-item",
        {
          x: 30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    } else {
      document.body.style.overflow = "auto";

      gsap.to(cartRef.current, {
        xPercent: 120,
        duration: 0.8,
        ease: "expo.inOut",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [state]);

  useEffect(() => {
    gsap.set(menuRef.current, {
      y: -500,
      opacity: 0,
    });
  }, []);

  useEffect(() => {
    if (value) {
      document.body.style.overflow = "hidden";

      gsap.to(menuRef.current, {
        y: 96,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
      });

      gsap.fromTo(
        ".menu-card",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    } else {
      document.body.style.overflow = "auto";

      gsap.to(menuRef.current, {
        y: -500,
        opacity: 0,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [value]);
}

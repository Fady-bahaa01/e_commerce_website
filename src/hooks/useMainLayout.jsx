import gsap from "gsap";
import { useEffect } from "react";

export default function useMainLayout(
  menuRef,
  cartRef,
  overlayRef,
  value,
  state,
) {
  // Initial positions
  useEffect(() => {
    if (!menuRef.current || !cartRef.current || !overlayRef.current) return;

    gsap.set(menuRef.current, {
      y: -500,
      opacity: 0,
      pointerEvents: "none",
    });

    gsap.set(cartRef.current, {
      xPercent: 120,
      opacity: 0,
      pointerEvents: "none",
    });

    gsap.set(overlayRef.current, {
      opacity: 0,
      pointerEvents: "none",
    });
  }, []);

  // Body scroll + overlay
  useEffect(() => {
    if (value || state) {
      document.body.style.overflow = "hidden";

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });

      overlayRef.current.style.pointerEvents = "auto";
    } else {
      document.body.style.overflow = "auto";

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          overlayRef.current.style.pointerEvents = "none";
        },
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [value, state]);

  // Menu animation
  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;

    gsap.killTweensOf(menu);

    if (value) {
      gsap.to(menu, {
        y: 96,
        opacity: 1,
        duration: 0.7,
        ease: "expo.out",
        pointerEvents: "auto",
      });

      gsap.fromTo(
        ".menu-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.15,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(menu, {
        y: -500,
        opacity: 0,
        duration: 0.5,
        ease: "expo.inOut",
        pointerEvents: "none",
      });
    }
  }, [value]);

  // Cart animation
  useEffect(() => {
    if (!cartRef.current) return;

    const cart = cartRef.current;

    gsap.killTweensOf(cart);

    if (state) {
      gsap.to(cart, {
        xPercent: -6,
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
        pointerEvents: "auto",
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
      gsap.to(cart, {
        xPercent: 120,
        opacity: 0,
        duration: 0.6,
        ease: "expo.inOut",
        pointerEvents: "none",
      });
    }
  }, [state]);
}

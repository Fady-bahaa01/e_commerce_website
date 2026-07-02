import { useEffect } from "react";
import gsap from "gsap";

export default function useStickyHeader(headerRef, logoRef) {
  useEffect(() => {
    if (!headerRef.current) return;

    let lastScroll = 0;
    let active = false;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // أعلى الصفحة
      if (currentScroll < 30) {
        if (active) {
          active = false;

          gsap.to(headerRef.current, {
            height: 96,
            backgroundColor: "rgba(14,14,14,1)",
            backdropFilter: "blur(0px)",
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            duration: 0.35,
          });

          gsap.to(logoRef.current, {
            scale: 1,
            duration: 0.35,
          });
        }

        lastScroll = currentScroll;
        return;
      }

      if (!active) {
        active = true;

        gsap.to(headerRef.current, {
          height: 72,
          backgroundColor: "rgba(14,14,14,0.82)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(logoRef.current, {
          scale: 0.92,
          duration: 0.35,
        });
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerRef, logoRef]);
}

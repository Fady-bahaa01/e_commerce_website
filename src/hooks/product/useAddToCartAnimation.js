import gsap from "gsap";

export default function useAddToCartAnimation(buttonRef) {
  const animate = () => {
    gsap.timeline()
      .to(buttonRef.current, {
        scale: 0.94,
        duration: 0.1,
      })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.25,
        ease: "back.out(3)",
      });
  };

  return animate;
}
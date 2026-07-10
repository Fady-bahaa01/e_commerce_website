import image from "../assets/manImage.png";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  let style = `font-manrope font-bold md:text-[40px] md:tracking-[1.43px] md:leading-11 uppercase `;

  const sectionRef = useRef(null);
  const TextRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        TextRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        imgRef.current,
        {
          scale: 1.1,
        },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.to(imgRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-172.25 md:h-158.25 lg:h-147 flex flex-wrap lg:flex-nowrap justify-center items-center md:gap-15.75 lg:gap-31.25"
    >
      <div
        ref={TextRef}
        className="md:w-143.25 md:h-67.5 lg:w-111.25 lg:h-73.75 order-2 flex flex-col items-center justify-center lg:block lg:order-1 mt-10 md:mt-0 lg:mt-0"
      >
        <h2
          className={
            style +
            `text-black text-[28px] tracking-[1px] lg:text-start text-center`
          }
        >
          Bringing you the{" "}
          <span
            className={style + `text-realorange text-[28px] tracking-[1px]`}
          >
            best
          </span>{" "}
          audio gear
        </h2>
        <p className="font-manrope font-normal text-[15px] leading-6.25 text-black/50 mt-8 text-center lg:text-start">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div
        ref={imgRef}
        className="h-75 lg:h-full w-full lg:w-147 order-1 lg:order-2 rounded-xl"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `cover`,
          backgroundPosition: `center`,
        }}
      ></div>
    </div>
  );
}

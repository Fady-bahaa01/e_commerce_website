import { Link } from "react-router-dom";
import { domain } from "../store";
import { forwardRef } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CategoriesCart = forwardRef(({ product }, ref) => {
  let spanContent = ">";
  const cardRef = useRef(null);

  useGSAP(() => {
    const el = cardRef.current;

    const enter = () => {
      gsap.to(el, {
        y: -12,
        scale: 1.04,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const leave = () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="category-card w-full md:w-55.75 h-41.25 lg:w-87.5 lg:h-51 flex flex-col bg-Gray justify-center items-center rounded-lg relative shadow-md hover:shadow-2xl transition-shadow duration-300"
    >
      <img
        src={domain + product?.image?.url}
        alt=""
        className=" bottom-28.25 lg:bottom-34.25 w-20 lg:w-30.75 object-cover absolute"
      />
      <p className="font-manrope font-bold text-black text-[18px] uppercase tracking-[1.29px] mb-4.25 lg:mb-3.75 mt-22 lg:mt-29">
        {product?.name}
      </p>
      <pre className="text-center mb-5.5">
        <Link to={`/category/${product?.documentId}`}>
          <span className=" font-manrope font-bold tracking-[1px] text-black/50 uppercase hover:text-realorange hover:tracking-[2px] transition-all duration-300">
            shop
          </span>
          <span className=" w-1.25 h-2.5 font-bold  ml-[13.32px] text-realorange ">
            {spanContent}
          </span>
        </Link>
      </pre>
    </div>
  );
});

export default CategoriesCart;

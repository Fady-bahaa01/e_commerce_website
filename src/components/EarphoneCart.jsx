import { Link } from "react-router-dom";
import earphone from "../assets/earphone.png";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { domain } from "../store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EarphoneCart() {
  const [product, setProduct] = useState([]);
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          filters: {
            id: {
              $in: [11],
            },
          },
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProduct(res.data.data);
      });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
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
        textRef.current,
        {
          x: 80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full h-106 md:h-80 mt-12">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2.75 lg:gap-7.5">
        <div
          ref={imgRef}
          className="w-full md:w-84.75 lg:w-135 h-50 md:h-80 rounded-xl"
          style={{
            backgroundImage: `url(${earphone})`,
            backgroundRepeat: false,
            backgroundSize: `cover`,
            backgroundPosition: "center",
          }}
        ></div>
        <div
          ref={textRef}
          className="w-full md:h-full md:w-84.75 lg:w-135 h-50 bg-Gray rounded-xl"
        >
          <div className="w-61.75 h-29.5 ml-6 mt-10.25 md:ml-23.75 md:mt-25.25">
            <h2 className="font-manrope font-bold text-[28px] text-black mb-8">
              YX1 EARPHONES
            </h2>
            <Link
              to={`/product/${product[0]?.documentId}`}
              className="w-40 h-12  flex justify-center items-center uppercase border border-black bg-transparent hover:bg-black transition duration-250 hover:text-white font-manrope text-[13px] font-bold text-black tracking-[2px]"
            >
              See Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

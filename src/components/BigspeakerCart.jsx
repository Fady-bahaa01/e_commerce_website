import { Link } from "react-router-dom";
import Speaker from "../assets/Speakerrr.png";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { domain } from "../store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BigspeakerCart() {
  const [product, setProduct] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          filters: {
            id: {
              $in: [12],
            },
          },
          populate: "*",
        },
      })
      .then((res) => {
        setProduct(res.data.data);
      });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scale: 1.05,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`w-full h-80 mt-12 rounded-xl relative`}
      style={{
        backgroundImage: `url(${Speaker})`,
        backgroundRepeat: false,
        backgroundSize: `cover`,
        backgroundPosition: "center",
      }}
    >
      <div className="w-51 h-29.5 ml-6 md:ml-15.5 lg:ml-23.75 top-25.25 absolute">
        <p className="font-manrope font-bold text-[28px] text-black mb-8">
          ZX7 SPEAKER
        </p>
        <Link
          to={`/product/${product[0]?.documentId}`}
          className="w-40 h-12  flex justify-center items-center uppercase border border-black bg-transparent hover:bg-black transition duration-250 hover:text-white font-manrope text-[13px] font-bold text-black tracking-[2px]"
        >
          See Product
        </Link>
      </div>
    </div>
  );
}

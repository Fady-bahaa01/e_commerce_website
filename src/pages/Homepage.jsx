import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { domain, toggleMenu } from "../store";
import axios from "axios";
import { Link } from "react-router-dom";
import headphone from "../assets/bit.png";
import CategoriesCart from "../components/CategoriesCart";
import SpeakerCart from "../components/SpeakerCart";
import BigspeakerCart from "../components/BigspeakerCart";
import EarphoneCart from "../components/EarphoneCart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSkeleton from "../Skeletons/HeroSkeleton";
import CategoriesSkeleton from "../Skeletons/CategoriesSkeleton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Homepage() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { value } = toggleMenu();
  const title = useRef(null);
  const subtitle = useRef(null);
  const button = useRef(null);
  const image = useRef(null);
  const imageWrapper = useRef(null);
  const Upcontainer = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          filters: {
            id: {
              $in: [16, 13, 12, 11],
            },
          },
          populate: "*",
        },
      })
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let url = domain + "/api/categories";
    axios
      .get(url, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {});

    // const tl = gsap.timeline();

    // tl.from(title.current, {
    //   x: -80,
    //   opacity: 0,
    //   duration: 0.8,
    // })
    //   .from(
    //     subtitle.current,
    //     {
    //       x: -80,
    //       opacity: 0,
    //       duration: 0.8,
    //     },
    //     "-=0.5",
    //   )
    //   .from(
    //     button.current,
    //     {
    //       y: 30,
    //       opacity: 0,
    //       duration: 0.6,
    //     },
    //     "-=0.4",
    //   )
    //   .from(
    //     image.current,
    //     {
    //       scale: 0.8,
    //       opacity: 0,
    //       duration: 1,
    //     },
    //     "-=0.8",
    //   );
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================
      //  INTRO ANIMATION
      // =========================
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      tl.from(title.current, {
        y: 80,
        opacity: 0,
        duration: 1,
      })
        .from(
          subtitle.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6",
        )
        .from(
          button.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .fromTo(
          image.current,
          {
            y: 60,
            scale: 0.92,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
          },
          "-=0.9",
        );

      // =========================
      //  SCROLL (wrapper)
      // =========================
      gsap.set(imageWrapper.current, { force3D: true });

      gsap.to(imageWrapper.current, {
        y: 60,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: Upcontainer.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // =========================
      //  MOUSE ( wrapper)
      // =========================
      const moveImage = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;

        gsap.to(imageWrapper.current, {
          x,
          y,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", moveImage);

      return () => {
        window.removeEventListener("mousemove", moveImage);
      };
    });

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".category-card");

    gsap.fromTo(
      cards,
      {
        y: 60,
        opacity: 0,
        scale: 0.96,
        filter: "blur(8px)",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  return (
    <div className="Upcontainer w-full bg-white z-3">
      <div className="w-full bg-[#0E0E0E] flex justify-center items-center ">
        <div className="container   w-full md:max-w-172.25 lg:max-w-277.5  z-1 lg:z-0">
          <div className="w-full h-158 flex justify-center items-center lg:block relative">
            <div className="w-82 h-80 md:w-94.75 md:h-86.5 lg:w-99.5 lg:h-86.5 lg:mt-32 z-3 flex flex-col items-center lg:block">
              <p className="font-manrope font-normal text-[14px] text-white/45 tracking-[10px]">
                NEW PRODUCT
              </p>
              {product.length === 0 ? (
                <HeroSkeleton />
              ) : (
                <h2
                  ref={title}
                  className="text-center lg:text-start font-manrope font-bold text-[37px] md:text-[56px] tracking-[2px] uppercase text-white leading-14.5 mt-4 md:mt-6"
                >
                  {product[3]?.name}
                </h2>
              )}
              <p
                ref={subtitle}
                className="text-center lg:text-start w-82 mb-7 md:mb-0 md:w-87.25 font-manrope font-normal text-[15px] text-white/75 leading-6.25 mt-6"
              >
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Link
                ref={button}
                to={`/product/${product[3]?.documentId}`}
                className="w-40 h-12 md:mt-10 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
              >
                See Product
              </Link>
            </div>
            <div
              ref={imageWrapper}
              className="absolute lg:left-[471.6px] lg:-top-37.5 md:-bottom-10 bottom-5 z-2"
            >
              <img
                ref={image}
                src={headphone}
                alt=""
                className="lg:w-[694.4px] md:w-160 md:h-195 w-132.5 h-159.75 object-cover opacity-50 lg:opacity-100 lg:h-165.25   will-change-transform origin-center backface-hidden "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="container w-full max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
          <div
            ref={gridRef}
            className=" w-full mt-50 grid md:grid-cols-3 grid-cols-1 md:gap-2.5 lg:gap-7.5 gap-17"
          >
            {category.length == 0 ? (
              <CategoriesSkeleton />
            ) : (
              category?.map((el, index) => (
                <div key={el.documentId}>
                  {" "}
                  <CategoriesCart product={el} />
                </div>
              ))
            )}
          </div>
          <SpeakerCart />
          <BigspeakerCart />
          <EarphoneCart />
        </div>
      </div>
    </div>
  );
}

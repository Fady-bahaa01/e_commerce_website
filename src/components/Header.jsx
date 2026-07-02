import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { PiShoppingCartThin } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { domain, useCart } from "../store";
import { toggleMenu } from "../store";
import { cart } from "../store";
import gsap from "gsap";
import useHeaderEntrance from "../hooks/useHeaderEntrance";
import useCartHover from "../hooks/useCartHover";
import useCartBadge from "../hooks/useCartBadge";
import useStickyHeader from "../hooks/useStickyHeader";

export default function Header() {
  const [category, setCategory] = useState([]);
  const { openMenu } = toggleMenu();
  const { openCart } = cart();
  const { items } = useCart();
  const logo = useRef(null);
  const navItems = useRef([]);
  const Cart = useRef(null);
  const badge = useRef(null);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  useHeaderEntrance(logo, navItems, Cart, category);

  useStickyHeader(headerRef, logo);

  useCartHover(Cart);

  useCartBadge(badge, items.length);

  const addToRefs = (el) => {
    if (el && !navItems.current.includes(el)) {
      navItems.current.push(el);
    }
  };

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
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const el = menuRef.current;

    const enter = () => {
      gsap.to(el, {
        scale: 1.2,
        rotate: 10,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(el, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
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
      ref={headerRef}
      className="w-full h-24 sticky top-0 z-50 flex justify-center items-center bg-[#0E0E0E] "
    >
      <div className=" container h-full w-full md:max-w-172.25 px-6 md:px-0 lg:max-w-277.5 border-b border-white/10 lg:border-white/20 flex items-center  justify-between relative">
        <MdOutlineMenu
          ref={menuRef}
          size={16}
          className="lg:hidden  h-3.75 cursor-pointer"
          onClick={() => {
            openMenu();
          }}
        />

        <h2
          ref={logo}
          className="font-manrope font-black text-white  lg:mr-49.25"
        >
          audiophile 2
        </h2>
        <div className="gap-8.5 hidden lg:flex">
          <Link
            ref={(el) => (navItems.current[0] = el)}
            to={"/"}
            className="font-manrope font-bold text-[13px] text-white hover:text-realorange"
          >
            HOME
          </Link>
          {category?.map((el) => (
            <Link
              ref={addToRefs}
              key={el.documentId}
              to={`/category/${el.documentId}`}
              className="font-manrope uppercase font-bold text-[13px] text-white hover:text-realorange"
            >
              {el.name}
            </Link>
          ))}
        </div>
        <div ref={Cart} className="lg:ml-[319.5px] relative">
          <PiShoppingCartThin
            size={23.33}
            className="    cursor-pointer"
            onClick={openCart}
          />
          {items.length != 0 && (
            <span
              ref={badge}
              className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 
               flex items-center justify-center 
               text-[10px] font-semibold text-white
               bg-linear-to-br from-red-500 to-red-700
               rounded-full shadow-lg border border-white/20"
            >
              {items?.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

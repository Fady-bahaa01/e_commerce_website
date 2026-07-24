import { Link, Outlet } from "react-router-dom";
import image from "./assets/manImage.png";
import gsap from "gsap";
import Footer from "./pages/Footer";
import { domain, toggleMenu, useCart } from "./store";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CategoriesCart from "./components/CategoriesCart";
import { cart } from "./store";
import CartItem from "./components/CartItem";
import Overlay from "./components/Overlay";
import Header from "./components/Header";
import Portfolio from "./components/Portfolio";
import useMainLayout from "./hooks/useMainLayout";

export default function Mainlayout() {
  const { count } = useCart();
  const { state } = cart();
  const { value, closeMenu } = toggleMenu();
  const { items, removeFromCart, calcTotal, total } = useCart();
  const { closeCart } = cart();
  const [category, setCategory] = useState([]);
  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const overlayRef = useRef(null);
  useMainLayout(menuRef, cartRef, overlayRef, value, state);

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
    calcTotal();
  }, [items]);

  // useEffect(() => {
  //   if (state || value) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [state, value]);

  return (
    <div className="w-full  bg-white">
      {(state || value) && (
        <div
          ref={overlayRef}
          onClick={() => {
            closeCart();
            closeMenu();
          }}
          className="fixed inset-0 z-40 bg-black/50"
        ></div>
      )}

      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        ref={menuRef}
        className={`z-50  fixed top-0 left-0 w-full h-187.5 md:h-85 flex justify-center items-center lg:hidden bg-white  `}
      >
        <div className="container flex justify-center  max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
          <div className="w-full  grid md:grid-cols-3 grid-cols-1 md:gap-2.5 gap-17">
            {category?.map((el) => (
              <div className="menu-card" key={el?.documentId}>
                <CategoriesCart product={el} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={cartRef}
        className={`z-70  fixed top-32 rounded-lg right-0 w-81.75 md:w-94.25 h-122 md:h-122 flex justify-center   bg-white  `}
      >
        <div className="container max-w-67.75 md:max-w-78.25 mt-7.75">
          <div className="w-full h-6.25 flex justify-between">
            <p className="font-manrope font-bold text-[18px] tracking-[1.29px] text-black uppercase">
              {`cart (${count})`}
            </p>
            <button
              onClick={removeFromCart}
              className="font-manrope font-bold text-[15px] leading-6.25 underline-offset-1 text-black/50 uppercase cursor-pointer"
            >
              remove all
            </button>
          </div>
          {items.length == 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="font-manrope font-bold text-[18px] tracking-[1.17px] text-black uppercase">
                there is no items added
              </p>
            </div>
          ) : (
            <div className="w-full mt-8 h-60 overflow-auto flex flex-col gap-6">
              {items?.map((el) => (
                <CartItem key={el.documentId} product={el} />
              ))}
            </div>
          )}

          {items.length !== 0 && (
            <div>
              <div className="w-full flex justify-between mt-8">
                <p className="font-manrope font-bold text-[15px] leading-6.25  text-black/50 uppercase">
                  total
                </p>
                <p className="font-manrope font-bold text-black text-[18px]">
                  $ {total}
                </p>
              </div>
              <Link
                to={"./checkout"}
                className="w-full h-12 md:mt-6 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
              >
                checkout
              </Link>
            </div>
          )}
        </div>
      </div>

      <Header />
      <div className={`w-full flex items-center justify-center `}>
        <Outlet />
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-30 md:mt-24 lg:mt-50">
        <div className="container w-full max-w-81.75 md:max-w-172.25 lg:max-w-277.5 mb-50">
          <Portfolio />
        </div>
        <Footer margin={"mt-50"} />
      </div>
    </div>
  );
}

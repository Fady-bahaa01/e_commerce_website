import { Link, Outlet } from "react-router-dom";
import image from "./assets/manImage.png";
import Header from "./components/header";
import Footer from "./pages/Footer";
import { domain, toggleMenu, useCart } from "./store";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoriesCart from "./components/CategoriesCart";
import { cart } from "./store";
import CartItem from "./components/CartItem";
import Overlay from "./components/Overlay";

export default function Mainlayout() {
  const { count } = useCart();
  const { state } = cart();

  const { value } = toggleMenu();
  const { items, removeFromCart, calcTotal, total } = useCart();
  const { closeCart } = cart();
  const [category, setCategory] = useState([]);
  let style = `font-manrope font-bold md:text-[40px] md:tracking-[1.43px] md:leading-11 uppercase `;
  console.log(items);
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

  return (
    <div className="w-full overflow-auto bg-white">
      <Overlay />
      {state ? (
        <div
          className={`w-full fixed  inset-0 z-40 bg-black/50`}
          onClick={closeCart}
        ></div>
      ) : null}
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={`z-30  fixed top-0 left-0 w-full h-187.5 md:h-85 flex justify-center items-center lg:hidden bg-white transform transition-transform duration-300 ${value ? "translate-y-22.5 " : "-translate-y-full  "} `}
      >
        <div className="container flex justify-center  max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
          <div className="w-full  grid md:grid-cols-3 grid-cols-1 md:gap-2.5 gap-17">
            {category?.map((el) => (
              <CategoriesCart product={el} key={el?.documentId} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`z-50  fixed top-8 rounded-lg right-0 w-81.75 md:w-94.25 h-122 md:h-122 flex justify-center   bg-white transform transition-transform duration-300 ${state ? "-translate-x-6 md:-translate-x-41.25 " : "translate-x-full  "} `}
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
        <div className="container w-full max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
          <div className="w-full h-172.25 md:h-158.25 lg:h-147 flex flex-wrap lg:flex-nowrap justify-center items-center md:gap-31.25">
            <div className="md:w-143.25 md:h-67.5 lg:w-111.25 lg:h-73.75 order-2 flex flex-col items-center justify-center lg:block lg:order-1 mt-10 md:mt-15.75 lg:mt-0">
              <h2
                className={
                  style +
                  `text-black text-[28px] tracking-[1px] lg:text-start text-center`
                }
              >
                Bringing you the{" "}
                <span
                  className={
                    style + `text-realorange text-[28px] tracking-[1px]`
                  }
                >
                  best
                </span>{" "}
                audio gear
              </h2>
              <p className="font-manrope font-normal text-[15px] leading-6.25 text-black/50 mt-8 text-center lg:text-start">
                Located at the heart of New York City, Audiophile is the premier
                store for high end headphones, earphones, speakers, and audio
                accessories. We have a large showroom and luxury demonstration
                rooms available for you to browse and experience a wide range of
                our products. Stop by our store to meet some of the fantastic
                people who make Audiophile the best place to buy your portable
                audio equipment.
              </p>
            </div>
            <div
              className="h-75 lg:h-full w-full lg:w-147 order-1 lg:order-2 rounded-xl"
              style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `cover`,
                backgroundPosition: `center`,
              }}
            ></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

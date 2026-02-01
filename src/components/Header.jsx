import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { PiShoppingCartThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";
import { domain, useCart } from "../store";
import { toggleMenu } from "../store";
import { cart } from "../store";

export default function Header() {
  const [category, setCategory] = useState([]);
  const { openMenu } = toggleMenu();
  const { openCart } = cart();
  const { items } = useCart();

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
  return (
    <div className="w-full h-24 z-70 flex justify-center items-center bg-black">
      <div className=" container h-full w-full mid:max-w-[689px] px-6 md:px-0 lg:max-w-277.5 border-b border-white/45 flex items-center  justify-between">
        <MdOutlineMenu
          className="lg:hidden w-4 h-3.75 cursor-pointer"
          onClick={() => {
            openMenu();
          }}
        />

        <h2 className="font-manrope font-black text-white  lg:mr-49.25">
          audiophile 2
        </h2>
        <div className="gap-8.5 hidden lg:flex">
          <Link
            to={"/"}
            className="font-manrope font-bold text-[13px] text-white hover:text-realorange"
          >
            HOME
          </Link>
          {category?.map((el) => (
            <Link
              key={el.documentId}
              to={`/category/${el.documentId}`}
              className="font-manrope uppercase font-bold text-[13px] text-white hover:text-realorange"
            >
              {el.name}
            </Link>
          ))}
        </div>
        <div className="lg:ml-[319.5px]">
          <PiShoppingCartThin
            className="   w-5.75 h-5 cursor-pointer"
            onClick={openCart}
          />
          {items.lenght != 0 && (
            <span className="z-20 w-2.5 h-2.5 rounded-full bg-realorange text-black">
              {items?.lenght}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

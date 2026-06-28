import { IoMdCheckmark } from "react-icons/io";
import { domain, toggleSuccesBox, useCart } from "../store";
import { use } from "react";
import { Link } from "react-router-dom";

export default function CartMessage() {
  const value = toggleSuccesBox((state) => state.value);
  const items = useCart((state) => state.items);
  const total = useCart((state) => state.total);
  console.log(items);
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={`w-81.75 h-150 md:w-135 md:h-145.25 bg-white flex justify-center items-center rounded-lg absolute left-6 top-10 md:top-12 md:left-28.5 lg:top-31.25 lg:left-112.5 ${value ? "block z-30" : "hidden"} `}
    >
      <div className="container max-w-65.75 md:max-w-111">
        <div className="w-full h-134 md:h-121.25">
          <div className="w-16 h-16 rounded-full flex justify-center items-center bg-realorange">
            <IoMdCheckmark size={22.55} />
          </div>
          <h1 className="font-manrope font-bold text-[24px] md:text-[32px] leading-9 tracking-[1.14px] text-black mt-5.75 md:mt-8.25">
            THANK YOU <br /> FOR YOUR ORDER
          </h1>
          <p className="font-manrope font-normal text-[15px] leading-6.25 text-black/50 mt-4 md:mt-6">
            You will receive an email confirmation shortly.
          </p>
          <div className="w-full h-58 md:h-35 rounded-lg flex flex-col md:flex-row mt-6 md:mt-8.25">
            <div className="w-full h-35 md:w-61.5 md:h-full bg-Gray rounded-bl-lg rounded-tl-lg flex justify-center items-center">
              <div className="w-51 md:w-49.5 h-23 flex flex-col gap-3">
                <div className="w-full h-12.5 flex justify-between">
                  <div className="w-12.5 h-full flex justify-center items-center">
                    <img
                      src={domain + items[0]?.prodimage.url}
                      alt=""
                      className="w-7 h-8"
                    />
                  </div>
                  <div className="w-18.75 h-full flex flex-col">
                    <p className=" h-6.25 font-manrope font-bold text-[15px] leading-6.25 text-black ">
                      {items[0]?.modalName}
                    </p>
                    <p className="font-manrope font-bold text-[14px] leading-6.25 text-black/50">
                      ${items[0]?.price}
                    </p>
                  </div>
                  <p className="font-manrope font-bold text-[14px] leading-6.25 text-black/50">
                    {items[0]?.qty >= 1 ? `x${items[0]?.qty}` : ""}
                  </p>
                </div>
                <div className="w-full h-px bg-black/8"></div>
                <div className="w-full h-4 flex justify-center items-center">
                  <p className="font-manrope font-bold text-[12px] text-black/50 -tracking-[0.21]">
                    {`${items?.length == 1 ? "no additional item(s)" : "and " + (items.length - 1) + " other item(s)"}  `}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-23 md:w-49.5 md:h-full  bg-black rounded-br-lg rounded-tr-lg">
              <div className="w-33.5 md:w-25.25 h-14.25 mt-3.75 ml-6 md:mt-10.25 md:ml-8">
                <h3 className="font-manrope font-normal text-[15px] leading-6.25 text-white/50">
                  GRAND TOTAL
                </h3>
                <h2 className="font-manrope font-bold text-[18px] text-white mt-2">
                  {`$ ${total + 50}`}
                </h2>
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="w-full h-12 flex justify-center items-center bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px] mt-5.75 md:mt-11.5"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { domain, toggleMenu } from "../store";
import axios from "axios";
import { Link } from "react-router-dom";
import headphone from "../assets/bit.png";
import CategoriesCart from "../components/CategoriesCart";
import SpeakerCart from "../components/SpeakerCart";
import BigspeakerCart from "../components/BigspeakerCart";
import EarphoneCart from "../components/EarphoneCart";

export default function Homepage() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { value } = toggleMenu();

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          filters: {
            id: {
              $in: [53, 56, 55, 54],
            },
          },
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data.data);
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
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-full bg-white z-3">
      <div className="w-full bg-black flex justify-center items-center ">
        <div className="container   w-full md:max-w-172.25 lg:max-w-277.5  z-1 lg:z-0">
          <div className="w-full h-158 flex justify-center items-center lg:block relative">
            <div className="w-82 h-80 md:w-94.75 md:h-86.5 lg:mt-32 z-3 flex flex-col items-center lg:block">
              <p className="font-manrope font-normal text-[14px] text-white/45 tracking-[10px]">
                NEW PRODUCT
              </p>
              <h2 className="text-center lg:text-start font-manrope font-bold text-[37px] md:text-[56px] tracking-[2px] uppercase text-white leading-14.5 mt-4 md:mt-6">
                XX99 Mark II Headphones
              </h2>
              <p className="text-center lg:text-start w-82 mb-7 md:mb-0 md:w-87.25 font-manrope font-normal text-[15px] text-white/75 leading-6.25 mt-6">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
              <Link
                to={`/product/${product[0]?.documentId}`}
                className="w-40 h-12 md:mt-10 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
              >
                See Product
              </Link>
            </div>
            <img
              src={headphone}
              alt=""
              className="lg:w-[694.4px] md:w-160 md:h-195 w-132.5 h-159.75 object-cover opacity-50 lg:opacity-100 lg:h-165.25 absolute lg:left-[471.6px] lg:-top-37.5 z-2 md:-bottom-10 bottom-5"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="container w-full max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
          <div className="w-full mt-50 grid md:grid-cols-3 grid-cols-1 md:gap-2.5 lg:gap-7.5 gap-17">
            {category?.map((el) => (
              <CategoriesCart product={el} key={el?.documentId} />
            ))}
          </div>
          <SpeakerCart speaker={product} />
          <BigspeakerCart />
          <EarphoneCart />
        </div>
      </div>
    </div>
  );
}

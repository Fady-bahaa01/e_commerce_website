import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { domain } from "../store";
import axios from "axios";
import CategoriesCart from "../components/CategoriesCart";

export default function Category() {
  const param = useParams();
  const [items, setItems] = useState([]);
  const [catDetails, setCatDetails] = useState([]);
  const [category, setCategory] = useState([]);
  let catId = param?.id;
  useEffect(() => {
    let catId = param?.id;
    let url = domain + `/api/categories/${catId}`;
    let url2 = domain + "/api/categories";
    axios
      .get(url, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setCatDetails(res.data.data);
      });

    axios
      .get(url, {
        params: {
          populate: {
            products: {
              populate: "*",
            },
          },
        },
      })
      .then((res) => {
        setItems(res.data.data.products);
        console.log(res.data.data.products);
      });

    axios
      .get(url2, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setCategory(res.data.data);
        console.log(res.data.data);
      });
  }, [catId]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-73.25 bg-black flex justify-center items-center">
        <div className="container w-full flex items-center justify-center max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
          <h1 className="font-manrope font-bold text-white text-[40px] leading-11 tracking-[1.43px] uppercase">
            {catDetails?.name}
          </h1>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="container w-full flex-col gap-40 h-full mt-40 flex items-center justify-center max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
          {items?.map((el, index) => (
            <div
              key={el?.documentId}
              className={`w-full h-176.5 lg:h-140 flex flex-col lg:flex-nowrap gap-8 md:gap-13 lg:gap-31.25 ${
                index % 2 == 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="w-full lg:w-135 h-88 lg:h-full flex items-center justify-center bg-Gray rounded-xl">
                <img
                  src={domain + el?.prodimage.url}
                  alt=""
                  className="w-55 h-60.75 lg:w-[349.24px] lg:h-96.5"
                />
              </div>
              <div className="flex flex-col items-center lg:block w-full md:w-111.25 h-85.75 md:mx-24.5 lg:mx-0 lg:my-27.25">
                <p className="font-manrope font-normal text-[14px] text-realorange tracking-[10px]">
                  NEW PRODUCT
                </p>
                <h2 className="font-manrope text-center lg:text-start font-bold text-black text-[28px] md:text-[40px] leading-11 tracking-[1.43px] uppercase mt-4.75">
                  {el?.name}
                </h2>
                <p className="text-center lg:text-start font-manrope font-normal text-[15px] text-black/50 leading-6.25 mt-6 md:mt-8">
                  {el?.description}
                </p>

                <Link
                  to={`/product/${el?.documentId}`}
                  className="w-40 h-12 mt-6 lg:mt-10 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
                >
                  See Product
                </Link>
              </div>
            </div>
          ))}
          <div className="w-full  grid md:grid-cols-3 grid-cols-1 md:gap-2.5 lg:gap-7.5 gap-17">
            {category?.map((el) => (
              <CategoriesCart product={el} key={el?.documentId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

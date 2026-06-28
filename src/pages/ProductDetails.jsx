import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { domain } from "../store";
import ProductImages from "../components/ProductImages";
import SuggestionCart from "../components/SuggestionCart";
import CategoriesCart from "../components/CategoriesCart";
import { useCart } from "../store";

export default function ProductDetails() {
  const param = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState();
  const [category, setCategory] = useState([]);
  const [item, setItems] = useState([]);
  const [youMayAlsoLike, setYouMayAlsoLike] = useState([]);
  console.log(item);

  const incrementQty = () => {
    setProduct((prev) => ({
      ...prev,
      qty: (prev.qty += 1),
    }));
  };
  const decrementQty = () => {
    setProduct((prev) => ({
      ...prev,
      qty: prev.qty > 1 ? (prev.qty -= 1) : 1,
    }));
  };

  useEffect(() => {
    let prodId = param?.id;
    let url = domain + `/api/products/${prodId}`;
    axios
      .get(url, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setProduct(res.data.data);
      });

    let url2 = domain + "/api/categories";
    axios
      .get(url2, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let url = domain + `/api/products`;

    axios
      .get(url, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        const products = res.data.data;
        setItems(products);
        const currentProductId = products.id;
        const filteredProducts = products.filter(
          (item) => item.id !== currentProductId,
        );
        const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
        setYouMayAlsoLike(shuffled.slice(0, 3));
      });
  }, []);

  useEffect(() => {
    let prodId = param?.id;
    let url = domain + `/api/products/${prodId}`;
    axios
      .get(url, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setProduct(res.data.data);
      });
  }, [param?.id]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="container w-full flex items-center flex-col justify-center max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
        <div className="w-full mt-19.75">
          <Link
            to={"/category/" + product?.category?.documentId}
            className="font-manrope font-normal text-[15px] leading-6.25 text-black/50 hover:text-realorange"
          >
            {" "}
            Go Back
          </Link>
        </div>
        <div className="w-full h-188.75 lg:h-140 flex flex-wrap md:flex-nowrap gap-8 md:gap-17.25 lg:gap-31.25 mt-14">
          <div className="w-full md:w-70.25 lg:w-135 h-81.75 md:h-120 lg:h-full flex items-center justify-center bg-Gray rounded-xl">
            <img
              src={domain + product?.prodimage.url}
              alt=""
              className="w-55 h-60.75 lg:w-[349.24px] lg:h-96.5"
            />
          </div>
          <div className=" w-full md:w-[339.5px] lg:w-[445.5px] h-94.25 md:h-97.5 lg:h-85.75  lg:mx-0 lg:my-19">
            <p className="font-manrope font-normal text-[14px] text-realorange tracking-[8.75px] lg:tracking-[10px]">
              NEW PRODUCT
            </p>
            <h2 className="font-manrope  text-start font-bold text-black md:text-[28px] lg:text-[40px] leading-8 lg:leading-11 tracking-[1.43px] uppercase mt-4.75">
              {product?.name}
            </h2>
            <p className=" font-manrope font-normal text-[15px] text-black/50 leading-6.25 mt-6 md:mt-8">
              {product?.description}
            </p>
            <p className=" font-manrope font-normal text-[15px] text-black tracking-[1.29px] mt-6 md:mt-8">
              $ {product?.price}
            </p>

            <div className="w-full flex gap-4 ">
              <div className="w-30 h-12 bg-Gray flex mt-auto">
                <div className="w-1/3 h-full flex justify-center items-center">
                  <button
                    onClick={() => decrementQty(product?.documentId)}
                    className="font-manrope font-bold text-[15px] text-black/25 tracking-[1px] cursor-pointer"
                  >
                    -
                  </button>
                </div>
                <div className="w-1/3 h-full flex justify-center items-center">
                  <p className="font-manrope font-bold text-[15px] text-black tracking-[1px]">
                    {product?.qty}
                  </p>
                </div>
                <div className="w-1/3 h-full flex justify-center items-center">
                  <button
                    onClick={() => incrementQty(product?.documentId)}
                    className="font-manrope font-bold text-[15px] text-black/25 tracking-[1px] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-40 h-12 mt-6 lg:mt-10 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-210 md:h-148.75 lg:h-79.5 flex flex-wrap lg:flex-nowrap gap-22 md:gap-30 lg:gap-31.25 mt-22 md:mt-30 lg:mt-40">
          <div className="w-full lg:w-158.75 h-133.75 md:h-79.5 lg:h-full">
            <h2 className="font-manrope font-bold text-[24px] md:text-[32px] leading-9 tracking-[1.14px] text-black">
              FEATURES
            </h2>
            <p className=" font-manrope font-normal text-[15px] text-black/50 leading-6.25 mt-6 md:mt-8">
              {product?.feature}
            </p>
          </div>
          <div className="w-full h-54.25 md:w-137.25 md:h-39.25 lg:w-87.5 lg:h-56.25 sm:block md:flex md:justify-between lg:block">
            <h2 className="font-manrope font-bold text-[24px] md:text-[32px] leading-9 tracking-[1.14px] text-black uppercase mb-8">
              in the box
            </h2>
            <div>
              {product?.boxitem?.map((el) => (
                <div className="flex lg:gap-5 mt-2" key={el.documentId}>
                  <p className="font-manrope font-bold text-[15px] text-realorange leading-6.25">
                    {el?.quantity}
                  </p>
                  <p className="font-manrope font-bold text-[15px] text-black leading-6.25">
                    {el?.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {product?.productimages && (
          <div className="w-full h-189 md:h-92 lg:h-148 mt-40  md:mb-0 md:auto-cols-[277px] lg:auto-cols-[445px]  md:auto-rows-[174px] lg:auto-rows-[280px] grid-cols-1 md:grid-cols-[277px_395px] grid lg:grid-cols-[445px_635px] md:gap-x-4.5 lg:gap-x-7.5 gap-y-5 lg:gap-y-8 ">
            {product?.productimages?.map((el, index) => (
              <ProductImages
                number={index}
                item={el}
                key={el.documentId}
                className={`${index % 2 == 0 ? "row-span-1 " : "row-span-2 "}`}
              />
            ))}
          </div>
        )}
        <div className="w-full h-245.75 md:h-140.75 lg:h-142.75 mt-40 flex flex-col items-center">
          <h2 className="font-manrope font-bold text-[32px] tracking-[1.14px] leading-8 text-black uppercase">
            you may also like
          </h2>
          <div className="w-full grid grid-cols-1 gap-14.25 md:grid-cols-3 md:gap-2.75 lg:gap-7.5 h-117.75 mt-16">
            {youMayAlsoLike?.map((el) => (
              <SuggestionCart product={el} key={el.documentId} />
            ))}
          </div>
        </div>
        <div className="w-full mt-30 lg:mt-[167.5px] grid md:grid-cols-3 grid-cols-1 md:gap-2.5 lg:gap-7.5 gap-17">
          {category?.map((el) => (
            <CategoriesCart product={el} key={el?.documentId} />
          ))}
        </div>
      </div>
    </div>
  );
}

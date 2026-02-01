import { Link } from "react-router-dom";
import earphone from "../assets/earphone.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../store";

export default function EarphoneCart() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          filters: {
            id: {
              $in: [36],
            },
          },
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProduct(res.data.data);
      });
  }, []);

  return (
    <div className="w-full h-106 md:h-80 mt-12">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2.75 lg:gap-7.5">
        <div
          className="w-full md:w-84.75 lg:w-135 h-50 md:h-80 rounded-xl"
          style={{
            backgroundImage: `url(${earphone})`,
            backgroundRepeat: false,
            backgroundSize: `cover`,
            backgroundPosition: "center",
          }}
        ></div>
        <div className="w-full md:h-full md:w-84.75 lg:w-135 h-50 bg-Gray rounded-xl">
          <div className="w-61.75 h-29.5 ml-6 mt-10.25 md:ml-23.75 md:mt-25.25">
            <h2 className="font-manrope font-bold text-[28px] text-black mb-8">
              YX1 EARPHONES
            </h2>
            <Link
              to={`/product/${product[0]?.documentId}`}
              className="w-40 h-12  flex justify-center items-center uppercase border border-black bg-transparent hover:bg-black hover:text-white font-manrope text-[13px] font-bold text-black tracking-[2px]"
            >
              See Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

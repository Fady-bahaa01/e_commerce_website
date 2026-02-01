import { Link } from "react-router-dom";
import speaker from "../assets/edited.png";
import { useEffect, useState } from "react";
import { domain } from "../store";
import axios from "axios";
export default function SpeakerCart() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          filters: {
            id: {
              $in: [56],
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
    <div className="w-full h-150 md:h-180 lg:h-140 bg-realorange mt-42 rounded-[10px] relative z-2 lg:overflow-hidden flex flex-col lg:flex-row">
      <div className="w-80 h-80 md:w-135.5 md:h-135.5 rounded-full border border-white/40 top-0 -left-12 md:-top-22 md:left-6 lg:left-0 lg:top-41.25 ml-13 flex justify-center items-center absolute  lg:mb-0">
        <div className="w-69.75 h-69.75 md:w-118 md:h-118 rounded-full my-7 lg:my-0 border border-white/40 flex justify-center items-center lg:block ">
          <img
            src={speaker}
            alt=""
            className="object-cover w-[172.25px] h-51.75 md:w-[197.21px] md:h-59.25 lg:w-102.5 lg:h-123.25 static lg:absolute left-[117.5px] -top-18"
          />
        </div>
      </div>
      <div className="flex flex-col items-center lg:block w-87.25 md:h-75.75 md:ml-42.75 mt-73.5 md:mt-88.25 lg:ml-166.5 lg:mt-33.25">
        <h2 className="text-[36px] md:text-[56px] font-manrope font-bold text-center lg:text-start text-white tracking-[1.29px]  md:tracking-[2px] mb-6 leading-10 md:leading-14.5">
          ZX9 <br /> SPEAKER
        </h2>
        <p className="w-70 md:w-full font-manrope font-normal text-white/75 mb-6 md:mb-10 text-center lg:text-start">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Link
          to={`/product/${product[0]?.documentId}`}
          className="w-40 h-12  flex justify-center items-center uppercase bg-dark hover:bg-[#4C4C4C] font-manrope text-[13px] font-bold text-white tracking-[2px]"
        >
          See Product
        </Link>
      </div>
    </div>
  );
}

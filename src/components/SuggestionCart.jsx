import { forwardRef, useEffect } from "react";
import { domain } from "../store";

import { Link, useNavigate } from "react-router-dom";

const SuggestionCart = forwardRef(({ product }, ref) => {
  useEffect(() => {}, [product?.documentId]);

  return (
    <div
      ref={ref}
      className="w-full md:w-55.75 lg:w-87.5 h-66.25 md:h-full flex flex-col items-center "
    >
      <div className="w-full h-30 md:h-79.5 bg-Gray flex justify-center items-center rounded-lg ">
        <img
          src={domain + product?.prodimage.url}
          alt=""
          className="w-18.25 md:w-[148.31px] h-21.75 md:h-48.25 "
        />
      </div>
      <p className="font-manrope font-bold text-center text-black text-[24px] tracking-[1.71px] mt-10 uppercase">
        {product?.shortname}
      </p>
      <Link
        to={`/product/${product?.documentId}`}
        className="w-40 h-12 mt-8 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
      >
        See Product
      </Link>
    </div>
  );
});

export default SuggestionCart;

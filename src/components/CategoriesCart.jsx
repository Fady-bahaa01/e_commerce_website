import { Link } from "react-router-dom";
import { domain } from "../store";
export default function CategoriesCart({ product }) {
  let spanContent = ">";

  return (
    <div className="w-full md:w-55.75 h-41.25 lg:w-87.5 lg:h-51 flex flex-col bg-Gray justify-center items-center rounded-lg relative">
      <img
        src={domain + product?.image?.url}
        alt=""
        className=" bottom-28.25 lg:bottom-34.25 w-20 lg:w-30.75 object-cover absolute"
      />
      <p className="font-manrope font-bold text-black text-[18px] uppercase tracking-[1.29px] mb-4.25 lg:mb-3.75 mt-22 lg:mt-29">
        {product?.name}
      </p>
      <pre className="text-center mb-5.5">
        <Link to={`/category/${product?.documentId}`}>
          <span className=" font-manrope font-bold tracking-[1px] text-black/50 uppercase hover:text-realorange">
            shop
          </span>
          <span className=" w-1.25 h-2.5 font-bold  ml-[13.32px] text-realorange">
            {spanContent}
          </span>
        </Link>
      </pre>
    </div>
  );
}

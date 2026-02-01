import { domain } from "../store";
import { useCart } from "../store";

export default function CartItem({ product }) {
  const { incrementQty, decrementQty, items } = useCart();
  return (
    <div
      key={product.documentId}
      className="w-full flex items-center justify-between h-16 "
    >
      <div className="w-39 h-16 flex  gap-4">
        <div className="w-16 h-16 flex justify-center items-center bg-Gray rounded-lg">
          <img
            src={domain + product?.prodimage.url}
            alt=""
            className="w-[36.19px] h-10"
          />
        </div>
        <div className="w-19 h-12.5">
          <p className="font-manrope font-bold text-[15px] leading-6.25  text-black uppercase">
            {product?.shortname}
          </p>
          <p className="font-manrope font-bold text-[14px] leading-6.25  text-black/50 uppercase">
            $ {product?.price}
          </p>
        </div>
      </div>
      <div className="w-24 h-8 bg-Gray flex ">
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
    </div>
  );
}

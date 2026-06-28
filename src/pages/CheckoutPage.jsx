import { Link } from "react-router-dom";
import Footer from "./Footer";
import { toggleSuccesBox } from "../store";
import Header from "../components/Header";
import CheckoutCard from "../components/CheckoutCard";
import CartMessage from "../components/CartMessage";

export default function CheckoutPage() {
  const value = toggleSuccesBox((state) => state.value);
  const closeBox = toggleSuccesBox((state) => state.closeBox);
  return (
    <div className={`w-full h-full overflow-auto bg-Gray`}>
      <Header />

      <div
        onClick={closeBox}
        className={`w-full h-546 md:h-485.25 lg:h-352.25 flex  justify-center relative `}
      >
        <div
          className={`w-full  fixed h-[2000px] md:h-[1181px] lg:h-auto inset-0 ${value ? "bg-black/40 z-20 block " : "hidden"}`}
        >
          <CartMessage />
        </div>
        <div className="container mt-4 md:mt-19.75 w-full flex items-center flex-col  max-w-81.75 md:max-w-172.25 lg:max-w-277.5 ">
          <div className="w-full ">
            <Link
              to={"../"}
              className="font-manrope font-normal text-[15px] leading-6.25 text-black/50 hover:text-realorange "
            >
              {" "}
              Go Back
            </Link>
          </div>
          <div
            className={`w-full h-505.5 md:h-443.75 lg:h-281.5 mt-6 md:mt-9.5 ${value ? " z-10" : "z-0"}`}
          >
            <CheckoutCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

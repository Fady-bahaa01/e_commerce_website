import { Link } from "react-router-dom";

export default function Error404Page() {
  return (
    <div className="w-full flex justify-center items-center ">
      <div className="container w-full  max-w-81.75 md:max-w-172.25 lg:max-w-277.5">
        <div className="w-full mt-19.75">
          <Link
            to={"../"}
            className="font-manrope font-normal text-[15px] leading-6.25 text-black/50 hover:text-realorange"
          >
            {" "}
            Go Back
          </Link>
        </div>
        <div className="w-full flex justify-center items-center mt-15 md:mt-35">
          <div className="w-full flex flex-col items-center justify-center gap-8">
            <h2 className="font-manrope text-center font-bold text-black text-[24px] md:text-[60px] lg:text-[80px] leading-[-0.28px] tracking-[8px] md:tracking-[14px] ">
              404 - Not Found
            </h2>
            <p className="font-manrope font-normal text-[15px] text-black/50 leading-6.25 ">
              The page you are looking for does not exist.
            </p>
            <Link
              to={`../`}
              className="w-63.5 h-12  flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
            >
              Back to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { href, Link } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import { useQuery } from "@tanstack/react-query";

export default function Footer({ margin }) {
  const {
    data: category = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const CategoriesLoading = category.length === 0;

  return (
    <div className="w-full flex justify-center h-163.5 md:h-100 lg:h-91.25 bg-dark ">
      <div className="container h-full flex flex-col items-center md:items-start  w-full max-w-81.75 md:max-w-172.25 lg:max-w-277.5 relative">
        <div className="w-25.25 h-1 bg-realorange mb-14 lg:mb-17.75"></div>
        <div className="w-full lg:h-6.25 flex gap-12 md:gap-0 lg:justify-between flex-col lg:flex-row">
          <h2 className="font-manrope font-black text-center md:text-start text-white md:mb-8 lg:mb-0 ">
            audiophile 2
          </h2>
          <div className="w-83.25 h-full flex items-center md:items-start flex-col md:flex-row gap-4 md:gap-8.5">
            <Link
              to={"/"}
              className="font-manrope font-bold text-[13px] text-white hover:text-realorange"
            >
              HOME
            </Link>
            {category?.map((el) => (
              <Link
                key={el.documentId}
                to={`category/${el.documentId}`}
                className="font-manrope uppercase font-bold text-[13px] text-white hover:text-realorange transition duration-250"
              >
                {el.name}
              </Link>
            ))}
          </div>
        </div>
        <p className="w-81.75 md:w-full lg:w-135 font-manrope font-normal text-center md:text-start text-[15px] leading-6.25 text-white/50 mt-8 lg:mt-9">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className="w-full mt-14 flex items-center md:items-start flex-col md:flex-row gap-12 md:gap-0 md:justify-between lg:block">
          <p className="font-manrope font-normal text-[15px] leading-6.25 text-white/50 ">
            Copyright 2021. All Rights Reserved
          </p>
          <div className="flex gap-4 static lg:absolute bottom-[138.25px] right-0">
            <a
              href="https://www.facebook.com/share/19JnDGyjFX/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-realorange transition duration-250"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1z" />
              </svg>
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-realorange transition duration-250"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/fady.bahaa_?utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-realorange transition duration-250"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

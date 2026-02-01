import { Link, useNavigate } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../store";

export default function Footer() {
  let face = useNavigate();
  let twitter = useNavigate();
  let insta = useNavigate();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    let url = domain + "/api/categories";
    axios
      .get(url, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setCategory(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-full flex justify-center h-163.5 md:h-100 lg:h-91.25 bg-dark mt-50">
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
                className="font-manrope uppercase font-bold text-[13px] text-white hover:text-realorange"
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
            <ImFacebook2
              onClick={() => {
                face("../https://www.facebook.com/");
              }}
              className="w-6 h-6 hover:text-realorange"
            />
            <FaTwitter
              onClick={() => {
                twitter("../https://x.com/");
              }}
              className="w-6 h-6 hover:text-realorange"
            />
            <FaInstagram
              onClick={() => {
                insta("../https://www.instagram.com/");
              }}
              className="w-6 h-6 hover:text-realorange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

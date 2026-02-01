import { useEffect, useState } from "react";
import { domain } from "../store";
import axios from "axios";

export default function ProductImages({ item, className }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    let url = domain + "/api/products";
    axios
      .get(url, {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProduct(res.data.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div
      className={`w-full h-full rounded-lg ${className} `}
      style={{
        backgroundImage: `url(${domain + item?.url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `cover`,
        backgroundPosition: `center`,
      }}
    ></div>
  );
}

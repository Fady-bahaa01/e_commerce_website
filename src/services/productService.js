import api from "../store/API";


export const getProducts = async () => {
  const res = await api.get("/products", {
    params: {
      filters: {
        id: {
          $in: [16, 13, 12, 11],
        },
      },
      populate: "*",
    },
  });

  return res.data.data;
};
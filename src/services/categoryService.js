import api from "../store/API";


export const getCategories = async () => {
  const res = await api.get("/categories", {
    params: {
      populate: "*",
    },
  });

  return res.data.data;
};
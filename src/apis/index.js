import axios from "../utils/axios";

export const getCategories = async () => {
  try {
    const request = await axios.get("/menu/categories");
    return request.data;
  } catch (error) {
    return error.respose;
  }
};

export const getMenuItems = async () => {
  try {
    const request = await axios.get("/menu/items");
    return request.data;
  } catch (error) {
    return error.respose;
  }
};

import axios from "../../utils/axios";
import { AxiosResponse } from "axios";
import { ICategory, IMenuItem } from "../types";

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const request: AxiosResponse<ICategory[]> = await axios.get(
      "/menu/categories"
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getMenuItems = async (): Promise<IMenuItem[]> => {
  try {
    const request: AxiosResponse<IMenuItem[]> = await axios.get("/menu/items");
    return request.data;
  } catch (error) {
    throw error;
  }
};

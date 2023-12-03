import axios from "../../utils/axios";
import { AxiosResponse } from "axios";
import { ICategory, IMenuItem } from "../types";

export const getCategories = async (): Promise<ICategory[]> => {
  const request: AxiosResponse<ICategory[]> = await axios.get(
    "/menu/categories"
  );
  return request.data;
};

export const getMenuItems = async (): Promise<IMenuItem[]> => {
  const request: AxiosResponse<IMenuItem[]> = await axios.get("/menu/items");
  return request.data;
};

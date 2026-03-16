import { IMenuPopularItem } from "./../types/menu";
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

export const getPopularItems = async (): Promise<IMenuPopularItem[]> => {
  const request: AxiosResponse<IMenuPopularItem[]> = await axios.get(
    "/menu/popular"
  );
  return request.data;
};

export interface ICustomerPopup {
  _id: number;
  title: string;
  content: string;
  imageUrl?: string;
  cooldownHours: number;
}

export const getActiveCustomerPopup = async (
  locationId: number
): Promise<ICustomerPopup | null> => {
  const request: AxiosResponse<ICustomerPopup | null> = await axios.get(
    `/menu/customer-popup/active?location=${locationId}`
  );
  return request.data;
};

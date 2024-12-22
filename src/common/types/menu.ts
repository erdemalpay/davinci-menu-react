export interface IMenuItem {
  _id: number;
  name: string;
  order: number;
  priceNeorama: number;
  priceBahceli: number;
  price: number;
  locations: number[];
  description: string;
  imageUrl: string;
  category: number;
  showInMenu: boolean;
}
export interface IMenuPopularItem {
  _id: number;
  item: number;
  order: number;
}

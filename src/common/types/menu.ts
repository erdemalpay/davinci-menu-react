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
  category: {
    _id: number;
    order: number;
    name: string;
    __v: number;
  };
}
export interface IMenuPopularItem {
  _id: number;
  item: IMenuItem;
  order: number;
}

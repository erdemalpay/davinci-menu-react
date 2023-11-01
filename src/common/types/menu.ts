export interface IMenuItem {
  _id: number;
  name: string;
  priceNeorama: number;
  priceBahceli: number;
  description: string;
  imageUrl: string;
  category: {
    _id: number;
    order: number;
    name: string;
    __v: number;
  };
}

export interface IMenuItem {
  _id: number;
  priceNeorama: number;
  priceBahceli: number;
  category: {
    _id: number;
    order: number;
    name: string;
    __v: number;
  };
  name: string;
}

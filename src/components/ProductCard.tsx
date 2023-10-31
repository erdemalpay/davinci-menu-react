import { IMenuItem } from "../common/types";

interface IProps {
  product: IMenuItem;
}

const ProductCard = ({ product }: IProps) => {
  const { name, category, priceNeorama } = product;

  return (
    <div className="bg-white rounded shadow-md overflow-hidden ">
      <div className="flex">
        <img
          className="max-md:w-32 w-36 object-cover"
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
          alt="image-s"
        />

        <div className="max-md:px-1 max-md:py-2 font-medium  px-2 py-3  flex-1">
          <p className="leading-none tracking-wide text-lg fontbold">{name}</p>
          <p className="text-gray-500 max-md:text-base"> {category?.name} </p>

          <p className="mt-1 max-md:text-base text-gray-500 leading-none">
            tiramisu under desserts (Tatlilar)
          </p>

          <div className="max-md:mt-1 mt-3 text-end ">
            <p className="text-md font-bold">
              <span>Price :</span>
              <span className="text-gray-500"> ₺ {priceNeorama}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

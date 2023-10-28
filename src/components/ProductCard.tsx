import { IMenuItem } from "../common/types";

interface IProps {
  product: IMenuItem;
}

const ProductCard = ({ product }: IProps) => {
  const { name, category, priceNeorama } = product;

  return (
    <div className="bg-white rounded-xl max-w-md shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-full w-full object-cover md:w-48"
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
            alt="image-s"
          />
        </div>
        <div className="p-4 max-sm:p-2">
          <p className="tracking-wide text-md fontbold text-orange-500">
            {name}
          </p>
          <p className="text-gray-500"> {category?.name} </p>

          <p className="mt-2 text-gray-500  max-sm:text-sm max-sm:mt-1">
            IngredientsIngredients IngredientsIngredients IngredientsIngredients
            ...
          </p>

          <div className="mt-3 text-end max-sm:mt-1">
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

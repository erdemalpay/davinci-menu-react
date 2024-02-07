import { IMenuItem } from "../common/types";
import { NO_IMAGE_URL } from "../utils/constants";

//------------------------------------------------------------------------
interface IProps {
  product: IMenuItem;
  param: number;
}

//--------------------------------------------------------------------------

const ProductCard = ({ product, param }: IProps) => {
  const { name, category, priceNeorama, priceBahceli, description, imageUrl } =
    product;

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden ">
      <div className="flex flex-row gap-2">
        <img
          className="max-md:w-32 w-36 object-cover"
          src={imageUrl ? imageUrl : NO_IMAGE_URL}
          alt={category.name}
        />
        <div className="flex flex-col justify-between py-3 w-full px-1">
          <div className="flex flex-col gap-2">
            <h1 className="leading-none text-lg font-semibold">{name}</h1>
            <p className=" text-xs text-gray-500 leading-none font-medium">
              {!description || description === "-" ? "" : description}
            </p>
          </div>
          {param && (
            <p className="font-bold ml-auto px-2 ">
              <span className="text-gray-500">
                ₺ {param === 1 ? priceBahceli : priceNeorama}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

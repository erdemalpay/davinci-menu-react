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
    <div className="bg-white rounded shadow-md overflow-hidden ">
      <div className="flex">
        <img
          className="max-md:w-32 w-36 object-cover"
          src={imageUrl ? imageUrl : NO_IMAGE_URL}
          alt={category.name}
        />

        <div className="max-md:px-1 max-md:py-2 max-h-32 font-medium px-2 py-3 flex-1">
          <p className="leading-none  text-lg fontbold">{name}</p>

          <p className="mt-1 text-xs text-gray-500 leading-none">
            {!description || description === "-" ? "" : description}
          </p>

          <div className="max-md:mt-8 mt-12 text-end ">
            {param ? (
              <p className="text-md font-bold">
                <span>Fiyat: </span>
                <span className="text-gray-500">
                  {" "}
                  ₺ {param === 1 ? priceBahceli : priceNeorama}
                </span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

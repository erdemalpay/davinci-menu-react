import { IMenuItem, ICategory } from "../common/types";
import { NO_IMAGE_URL } from "../utils/constants";

//------------------------------------------------------------------------
interface IProps {
  product: IMenuItem;
  param: number;
  categories: ICategory[];
}

//--------------------------------------------------------------------------

const ProductCard = ({ product, categories }: IProps) => {
  const { name, category, price, description, imageUrl } = product;
  const foundCategory = categories.find((cat) => cat._id === category);
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden ">
      <div className="flex flex-row gap-2">
        <img
          className="max-md:w-32 w-36 h-36 object-cover"
          src={imageUrl && imageUrl !== "" ? imageUrl : NO_IMAGE_URL}
          alt={foundCategory?.name}
        />
        <div className="flex flex-col py-3 w-full px-1 min-w-0">
          <div className="flex flex-row items-center justify-between gap-2 mb-2">
            <h1 className="leading-none text-lg font-semibold">{name}</h1>
            <p className="font-bold shrink-0 px-2">
              <span className="text-gray-500">₺ {price}</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 font-medium whitespace-pre-line">
            {!description || description === "-" ? "" : description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

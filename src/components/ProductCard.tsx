import { IMenuItem, ICategory } from "../common/types";
import { NO_IMAGE_URL } from "../utils/constants";

interface IProps {
  product: IMenuItem;
  param: number;
  categories: ICategory[];
  onClick?: () => void;
}

const ProductCard = ({ product, categories, onClick }: IProps) => {
  const { name, category, price, referencePrice, description, imageUrl } = product;
  const foundCategory = categories.find((cat) => cat._id === category);

  return (
    <div
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-100 cursor-pointer active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="flex flex-row h-[120px] md:h-[130px]">
        {/* Image */}
        <div className="relative shrink-0 w-[120px] md:w-[130px] h-full overflow-hidden">
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={imageUrl && imageUrl !== "" ? imageUrl : NO_IMAGE_URL}
            alt={foundCategory?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
        </div>

        {/* Content */}
        <div className="flex flex-col py-3 px-3 w-full min-w-0 overflow-hidden">
          {/* Name + price row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h1 className="text-gray-900 font-semibold text-[15px] leading-snug line-clamp-2 flex-1">
              {name}
            </h1>
            <div className="flex flex-col items-end shrink-0">
              {!!referencePrice && referencePrice > 0 && (
                <span className="relative text-gray-400 text-xs font-medium px-1 leading-none mb-0.5">
                  ₺ {referencePrice}
                  <span
                    className="absolute inset-x-0 border-gray-400"
                    style={{
                      borderTopWidth: "1.5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </span>
              )}
              <span className="text-amber-600 font-bold text-lg leading-none">
                ₺ {price}
              </span>
            </div>
          </div>

          {description && description !== "-" && (
            <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

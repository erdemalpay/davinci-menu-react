import { ICategory } from "../common/types";
import { NO_IMAGE_URL } from "../utils/constants";

interface IProps {
  category: ICategory;
  isActive?: boolean;
}

const CategoryCard = ({ category, isActive }: IProps) => {
  const { name, imageUrl } = category;
  return (
    <div className="flex flex-col items-center py-2 px-1 cursor-pointer select-none">
      <div
        className={`relative rounded-full overflow-hidden transition-all duration-300 shrink-0
          md:h-[84px] md:w-[84px] h-[64px] w-[64px]
          ${isActive
            ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-[#f5f0e8] shadow-md shadow-amber-300/40"
            : "ring-1 ring-gray-300 hover:ring-amber-300"
          }`}
      >
        <img
          src={imageUrl || NO_IMAGE_URL}
          alt={name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {isActive && (
          <div className="absolute inset-0 bg-amber-500/10 rounded-full" />
        )}
      </div>
      <p
        className={`text-center mt-2 text-[11px] max-md:text-[10px] leading-tight max-w-[80px] transition-colors duration-200
          ${isActive ? "text-amber-700 font-semibold" : "text-gray-500"}`}
      >
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;

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
        className={`p-[2.5px] rounded-full transition-all duration-300 shrink-0
          md:h-[84px] md:w-[84px] h-[64px] w-[64px]
          ${isActive
            ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
            : "bg-gray-200 hover:bg-gradient-to-tr hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500"
          }`}
      >
        <div className="rounded-full overflow-hidden w-full h-full p-[2px] bg-white">
          <img
            src={imageUrl || NO_IMAGE_URL}
            alt={name}
            className="h-full w-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <p
        className={`text-center mt-2 text-[11px] max-md:text-[10px] leading-tight max-w-[80px] transition-colors duration-200
          ${isActive ? "text-pink-600 font-semibold" : "text-gray-500"}`}
      >
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;

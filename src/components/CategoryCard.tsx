import { ICategory } from "../common/types";

function getRandom() {
  return Math.floor(Math.random() * 3) + 1;
}

interface IProps {
  Category: ICategory;
  isActive?: boolean;
}

const CategoryCard = ({ Category, isActive }: IProps) => {
  const { name } = Category;

  return (
    <div className="text-center cursor-pointer">
      <div
        className={`${
          isActive ? "bg-[#FFD205]" : ""
        } w-48 border border-gray-200 shadow-md py-3 px-5 rounded-lg bg-white hover:bg-[#FFD205a0] duration-1000  overflow-hidden max-sm:w-32`}
      >
        <div className="h-36 overflow-hidden">
          <img
            src={`src/assets/${getRandom()}.png`}
            alt="card-image"
            className="h-full w-full object-fit"
          />
        </div>
      </div>
      <div className="p-4 text-[#7D849A]">
        <p className={`${isActive ? "text-orange-400" : ""}  font-medium`}>
          {name}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;

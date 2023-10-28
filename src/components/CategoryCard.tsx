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
          isActive ? "bg-[#f8a56c]" : ""
        } w-48 border border-gray-200 shadow-md py-3 px-5 rounded-lg bg-white hover:bg-orange-200 duration-1000  overflow-hidden`}
      >
        <div className="h-36 overflow-hidden">
          <img
            src={`src/assets/${getRandom()}.png`}
            alt="card-image"
            className="h-full w-full object-fit"
          />
        </div>
      </div>
      <div className="p-4">
        <p className={`${isActive ? "text-orange-400" : ""}  font-medium`}>
          {name}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;

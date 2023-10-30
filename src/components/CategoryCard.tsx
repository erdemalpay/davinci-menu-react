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
    <div className="flex flex-col items-center">
      <div
        className={`${
          isActive ? "bg-yellow-400" : ""
        } overflow-hidden flex justify-center items-center max-md:w-24 max-md:h-24 h-40 w-40 shadow-lg hower:shadow-xl hover:transform hover:scale-105 rounded bg-white duration-300 hover:cursor-pointer`}
      >
        <img
          src={`src/assets/${getRandom()}.png`}
          alt="card-image"
          className="h-28 max-md:h-14 object-fit"
        />
      </div>
      <p className="text-center mt-1 text-slate-700 max-md:text-sm">{name}</p>
    </div>
  );
};

export default CategoryCard;

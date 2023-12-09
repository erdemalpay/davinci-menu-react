import { ICategory } from "../common/types";

function getRandom() {
  return Math.floor(Math.random() * 3) + 1;
}

interface IProps {
  category: ICategory;
  isActive?: boolean;
}

const CategoryCard = ({ category, isActive }: IProps) => {
  const { name, imageUrl } = category;
  return (
    <div className="flex flex-col items-center mt-2">
      <div
        className={
          "flex justify-center items-center shadow hower:shadow-xl md:h-36 md:w-36 h-24 w-24 hover:transform hover:scale-105 md:rounded-xl bg-white duration-300 hover:cursor-pointer"
        }
      >
        <img
          src={imageUrl || `./assets/${getRandom()}.png`}
          alt="card-image"
          className="md:h-[134px] md:w-[134px] h-[90px] w-[90px] object-fit md:rounded-xl"
        />
      </div>
      <p
        className={`${
          isActive ? "font-bold" : ""
        } text-center mt-1 text-slate-700 max-md:text-sm`}
      >
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;

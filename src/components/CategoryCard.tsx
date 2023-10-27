import { ICategory } from "../common/types";

function getRandom() {
  return Math.floor(Math.random() * 3) + 1;
}

interface IProps {
  Category: ICategory;
}

const CategoryCard = ({ Category }: IProps) => {
  const { name } = Category;

  return (
    <div className="text-center cursor-pointer">
      <div className="w-36 border border-gray-200 shadow-lg p-3 rounded-lg">
        <div className="h-36 overflow-hidden">
          <img
            src={`src/assets/${getRandom()}.png`}
            alt="card-image"
            className="h-full w-full object-fit"
          />
        </div>
      </div>
      <div className="p-4">
        <p className="text-blue-gray font-medium">{name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

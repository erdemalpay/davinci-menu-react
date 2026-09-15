import { useState } from "react";
import { IMenuItem, ICategory } from "../common/types";
import { NO_IMAGE_URL } from "../utils/constants";

interface IProps {
  product: IMenuItem;
  param: number;
  categories: ICategory[];
  onClick?: () => void;
}

const DESC_LIMIT = 90;

const ProductCard = ({ product, categories }: IProps) => {
  const [expanded, setExpanded] = useState(false);

  const { name, category, price, referencePrice, description, imageUrl } = product;
  const foundCategory = categories.find((cat) => cat._id === category);
  const hasDesc = description && description !== "-";
  const isTruncated = hasDesc && description.length > DESC_LIMIT;

  return (
    <div className="bg-white border-b border-gray-200 md:border md:rounded-lg md:overflow-hidden md:mb-4">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <img
            src={foundCategory?.imageUrl || NO_IMAGE_URL}
            alt={foundCategory?.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 border-2 border-gray-200"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 leading-tight">
              {name}
            </span>
            <span className="text-xs text-gray-500 leading-tight">
              {foundCategory?.name}
            </span>
          </div>
        </div>
      </div>

      {/* ── Image ── */}
      <div className="relative w-full aspect-square select-none">
        <img
          src={imageUrl && imageUrl !== "" ? imageUrl : NO_IMAGE_URL}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* price overlay */}
        <div className="absolute bottom-0 right-0 p-3 pointer-events-none">
          <div className="flex flex-col items-end">
            {!!referencePrice && referencePrice > 0 && (
              <span className="relative text-white/60 text-base font-medium px-0.5 leading-none mb-1">
                ₺{referencePrice}
                <span
                  className="absolute inset-x-0 border-white/60"
                  style={{ borderTopWidth: "1px", top: "50%", transform: "translateY(-50%)" }}
                />
              </span>
            )}
            <span className="text-amber-400 font-bold text-3xl drop-shadow-md leading-none">
              ₺{price}
            </span>
          </div>
        </div>
      </div>

      {/* ── Caption ── */}
      {hasDesc && (
        <div className="px-3 pt-2.5 pb-4">
          <p className="text-sm text-gray-900 leading-snug">
            <span className="font-semibold mr-1">{name}</span>
            {expanded || !isTruncated
              ? description
              : description.slice(0, DESC_LIMIT) + "..."}
            {isTruncated && !expanded && (
              <>
                {" "}
                <button
                  onClick={() => setExpanded(true)}
                  className="text-gray-500 text-sm font-normal"
                >
                  devamını gör
                </button>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[120px] md:h-[130px]">
      <div className="animate-pulse flex h-full">
        <div className="shrink-0 w-[120px] md:w-[130px] h-full bg-gray-200" />
        <div className="flex flex-col justify-between py-3 px-3 flex-1">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="h-2 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="flex justify-end">
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

const CategoryCardSkeleton = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center items-center max-md:w-24 max-md:h-24 h-36 w-36 shadow  border border-gray-200  p-1 rounded-lg">
        <div className="animate-pulse space-x-2">
          <div className="rounded bg-slate-300 h-24 w-24 max-md:h-14 max-md:w-14"></div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className=" mt-6 h-2 mb-1 bg-slate-300 rounded w-16"></div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;

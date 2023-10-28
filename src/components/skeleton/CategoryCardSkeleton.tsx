const CategoryCardSkeleton = () => {
  return (
    <div className="text-center">
      <div className="w-48 border border-gray-200 shadow-md p-1 rounded-lg">
        <div className="animate-pulse space-x-2">
          <div className="rounded bg-slate-300 h-36"></div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className=" mt-6 h-2 mb-1 bg-slate-300 rounded w-16"></div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;

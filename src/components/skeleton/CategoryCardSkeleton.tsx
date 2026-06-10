const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center py-2 px-1">
      <div className="animate-pulse rounded-full bg-gray-200 md:h-[84px] md:w-[84px] h-[64px] w-[64px] shrink-0" />
      <div className="animate-pulse mt-2 h-2 bg-gray-200 rounded w-14" />
    </div>
  );
};

export default CategoryCardSkeleton;

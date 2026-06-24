const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border-b border-gray-200 animate-pulse">
      {/* header */}
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
        <div className="h-3 w-28 bg-gray-200 rounded" />
      </div>
      {/* image */}
      <div className="w-full aspect-square bg-gray-200" />
      {/* actions */}
      <div className="flex items-center gap-4 px-3 pt-3 pb-2">
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="h-6 w-6 rounded-full bg-gray-200" />
        <div className="ml-auto h-6 w-6 rounded-full bg-gray-200" />
      </div>
      {/* likes + caption */}
      <div className="px-3 pb-4 space-y-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-300 shadow rounded-xl p-1 max-w-md w-full overflow-hidden md:max-w-2xl mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded flex-[.3] bg-slate-300 w-full md:flex-shrink-0"></div>

        <div className="flex-[.7] space-y-3 p-4 max-sm:p-2">
          <div>
            <div className="h-2 mb-1 bg-slate-300 rounded w-16"></div>
            <div className="h-2 bg-slate-300 rounded w-20"></div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-1">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="h-2 bg-slate-300 rounded"></div>
          </div>

          <div className="my-2 text-right w-full">
            <div className="h-2 bg-slate-300 w-16 rounded "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

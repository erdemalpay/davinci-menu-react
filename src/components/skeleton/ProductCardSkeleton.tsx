const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-300  bg-white rounded shadow-md  ">
      <div className="animate-pulse flex  w-full">
        <div className="rounded max-md:w-32 w-36 max-md:h-32 h-36 bg-slate-300 "></div>

        <div className="max-md:px-1 max-md:py-1 px-2 py-3  flex-1 max-md:w-56">
          <div>
            <div className="h-2 mb-1 bg-slate-300 rounded w-16"></div>
            <div className="h-2 bg-slate-300 rounded w-20"></div>
          </div>

          <br />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-1">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>

            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="h-2 bg-slate-300 rounded"></div>
          </div>

          <div className="my-2 flex justify-end w-full">
            <div className="h-2 bg-slate-300 w-16 rounded "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

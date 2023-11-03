const OffersCard = () => {
  return (
    <div className="rounded  h-40 w-72 shadow overflow-hidden  bg-gradient-to-r from-gray-600 to-gray-300">
      <div className="uppercase my-6 pl-5 text-xl font-semibold text-white">
        {" "}
        Make Your First
      </div>
      <div className="uppercase pl-5 text-3xl font-bold text-[#FFD205]">
        {" "}
        50% off{" "}
      </div>

      <div className="flex justify-end">
        <div className="rounded p-3 bg-[#FF7F56] text-white overflow-hidden">
          Free Coffee
        </div>
      </div>
    </div>
  );
};

export default OffersCard;

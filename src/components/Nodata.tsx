const Nodata = () => {
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-orange-600">Oops!</p>

        <h1 className="mt-4 text-3xl font-bold text-gray-800 ">No Data</h1>

        <p className="mt-6 text-base font-semibold text-gray-600">
          Sorry, we could't find what you are looking for.{" "}
        </p>
      </div>
    </div>
  );
};

export default Nodata;

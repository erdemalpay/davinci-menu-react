const Header = () => {
  const locations = [{ _id: 2, name: "Neorama" }];
  const pathSegments = window.location.pathname.split("/");
  const lastSegment = pathSegments.pop() || pathSegments.pop();
  const param = Number(lastSegment);

  return (
    <div className="head-container w-full h-[88px] max-md:h-[72px]">
      <div className="relative z-10 h-full flex items-center justify-between px-6 max-md:px-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src="./assets/logo.svg" alt="Logo" className="h-11 max-md:h-9 drop-shadow" />
          <div className="flex flex-col">
            <span className="text-amber-700 text-[10px] tracking-[0.3em] uppercase font-semibold leading-none mb-0.5">
              Da Vinci
            </span>
            <span className="text-gray-800 font-bold text-sm max-md:text-xs tracking-wide leading-none">
              Board Game Cafe
            </span>
            <span className="text-gray-500 text-[9px] tracking-[0.2em] uppercase leading-none mt-0.5">
              Menu
            </span>
          </div>
        </div>

        {/* Location pills */}
        <div className="flex gap-2">
          {locations.map((location) => (
            <a
              key={location._id}
              href={String(location._id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                param === location._id
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                  : "border-amber-600/40 text-amber-700 hover:border-amber-600 hover:bg-amber-50"
              }`}
            >
              {location.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;

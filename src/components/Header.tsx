const Header = () => {
  const locations = [
    { _id: 1, name: "Bahçeli" },
    { _id: 2, name: "Neorama" },
  ];
  const pathSegments = window.location.pathname.split("/");
  const lastSegment = pathSegments.pop() || pathSegments.pop();
  const param = Number(lastSegment);
  return (
    <div className="head-container w-full flex items-center justify-center gap-3 max-md:h-[120px] h-36">
      <div className="flex flex-row gap-3 ml-auto items-center justify-center">
        <img src="./assets/logo.svg" alt="Logo" />
        <div className="text-xl font-bold max-sm:text-base">
          DA VINCI BOARD GAME MENU
        </div>
      </div>

      {/* location select */}
      <div className="flex flex-row gap-2 w-fit ml-auto mr-2">
        {locations.map((location) => (
          <a
            key={location._id}
            className={`px-2 ml-auto w-fit border-2 rounded-md cursor-pointer ${
              param === location._id ? "bg-orange-900" : ""
            }`}
            href={String(location._id)}
          >
            <div className="text-lg font-bold">{location.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;

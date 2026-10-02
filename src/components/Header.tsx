import { useState } from "react";
import { useQuery } from "react-query";
import { getOpenTournaments } from "../common/apis";
import TournamentsModal from "./TournamentsModal";

const Header = () => {
  const [isTournamentsOpen, setIsTournamentsOpen] = useState(false);
  const { data: tournaments = [] } = useQuery("openTournaments", getOpenTournaments);
  const locations = [{ _id: 2, name: "Neorama" }];
  const pathSegments = window.location.pathname.split("/");
  const lastSegment = pathSegments.pop() || pathSegments.pop();
  const param = Number(lastSegment);

  return (
    <div className="head-container w-full h-[88px] max-md:h-[72px]">
      <div className="relative z-10 h-full flex items-center justify-between px-6 max-md:px-3">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-3 max-md:gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="./assets/logo.svg" alt="Logo" className="h-11 max-md:h-8 drop-shadow" />
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

        {/* Location pills + kaydı açık turnuva varsa Turnuvalar butonu */}
        <div className="flex items-center gap-2 max-md:gap-1">
          {tournaments.length > 0 && (
            <button
              onClick={() => setIsTournamentsOpen(true)}
              className="flex items-center gap-1.5 max-md:gap-0.5 px-3 max-md:px-2.5 py-1.5 rounded-full text-sm max-md:text-xs font-semibold whitespace-nowrap border bg-amber-600 text-white border-amber-600 shadow-sm hover:bg-amber-700 transition-all duration-200"
            >
              <span aria-hidden>🏆</span>
              Turnuvalar
              <span className="max-md:hidden min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-white text-amber-700 text-xs">
                {tournaments.length}
              </span>
            </button>
          )}
          {locations.map((location) => (
            <a
              key={location._id}
              href={String(location._id)}
              className={`px-4 max-md:px-3 py-1.5 rounded-full text-sm max-md:text-xs font-semibold border transition-all duration-200 ${
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
      {isTournamentsOpen && (
        <TournamentsModal tournaments={tournaments} onClose={() => setIsTournamentsOpen(false)} />
      )}
    </div>
  );
};

export default Header;

import React from "react";
import { IOpenTournament } from "../common/apis";
import MenuModal, { MenuModalTitle } from "./MenuModal";

// Kayıt formu panelde; ?source=qr ile başvurunun menüden (masadaki QR) geldiği görünür
const registrationUrl = (slug: string) =>
  `${import.meta.env.VITE_PANEL_URL}/tournament/${slug}?source=qr`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

interface Props {
  tournaments: IOpenTournament[];
  onClose: () => void;
}

const TournamentsModal: React.FC<Props> = ({ tournaments, onClose }) => (
  <MenuModal onClose={onClose}>
    <div className="px-6 pt-5 pb-6 text-center">
      <MenuModalTitle>Aktif Turnuvalar</MenuModalTitle>
      <div className="flex flex-col gap-3">
        {tournaments.map((tournament) => (
          <a
            key={tournament._id}
            href={registrationUrl(tournament.slug)}
            className="flex items-center justify-between gap-3 text-left rounded-xl border border-amber-600/30 px-4 py-3 hover:border-amber-600 hover:bg-amber-50 transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {tournament.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(tournament.date)}
              </span>
            </div>
            <span className="shrink-0 text-sm font-semibold text-amber-700">
              Kayıt Ol →
            </span>
          </a>
        ))}
      </div>
    </div>
  </MenuModal>
);

export default TournamentsModal;

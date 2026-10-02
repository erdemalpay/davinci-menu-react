import React from "react";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

// Menüdeki modalların ortak kabuğu: karartılmış arka plan, kutu ve kapat butonu
const MenuModal: React.FC<Props> = ({ onClose, children }) => (
  <div
    className="fixed inset-0 z-[1100] flex items-center justify-center px-4"
    style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
    onClick={onClose}
  >
    {/* Modal kutusu — tıklamayı yakala, kapatma */}
    <div
      className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto animate-fade-in"
      style={{ boxShadow: "0 8px 40px rgba(247,156,104,0.25)" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Kapat butonu */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-100 text-gray-400 hover:text-orange-500 transition-colors text-lg font-bold leading-none"
        aria-label="Kapat"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

// Başlık ve altındaki turuncu ayraç
export const MenuModalTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <h2
      className="text-xl font-bold mb-3 leading-snug"
      style={{ color: "#2d2d2d", fontFamily: "Poppins, sans-serif" }}
    >
      {children}
    </h2>
    <div
      className="mx-auto mb-4 h-0.5 w-12 rounded-full"
      style={{ background: "linear-gradient(90deg, #f79c68, #f4623a)" }}
    />
  </>
);

export default MenuModal;

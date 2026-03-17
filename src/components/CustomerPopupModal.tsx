import React from "react";
import { ICustomerPopup } from "../common/apis";

interface Props {
  popup: ICustomerPopup;
  onClose: () => void;
}

const CustomerPopupModal: React.FC<Props> = ({ popup, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      {/* Modal kutusu — tıklamayı yakala, kapatma */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in"
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

        {/* Görsel */}
        {popup.imageUrl && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={popup.imageUrl}
              alt={popup.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* İçerik */}
        <div className="px-6 pt-5 pb-6 text-center">
          {/* Başlık */}
          <h2
            className="text-xl font-bold mb-3 leading-snug"
            style={{ color: "#2d2d2d", fontFamily: "Poppins, sans-serif" }}
          >
            {popup.title}
          </h2>

          {/* Ayraç */}
          <div
            className="mx-auto mb-4 h-0.5 w-12 rounded-full"
            style={{ background: "linear-gradient(90deg, #f79c68, #f4623a)" }}
          />

          {/* İçerik metni */}
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: "#5a5a5a" }}
          >
            {popup.content}
          </p>

          {/* Tamam butonu */}
          <button
            onClick={onClose}
            className="mt-6 w-full py-2.5 rounded-xl font-semibold text-white text-sm tracking-wide transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #f79c68, #f4623a)",
              boxShadow: "0 4px 14px rgba(244,98,58,0.35)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
            }
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPopupModal;

import React from "react";
import { ICustomerPopup } from "../common/apis";
import MenuModal, { MenuModalTitle } from "./MenuModal";

const primaryButtonStyle = {
  background: "linear-gradient(135deg, #f79c68, #f4623a)",
  boxShadow: "0 4px 14px rgba(244,98,58,0.35)",
};

interface Props {
  popup: ICustomerPopup;
  onClose: () => void;
}

const CustomerPopupModal: React.FC<Props> = ({ popup, onClose }) => {
  return (
    <MenuModal onClose={onClose}>
      {/* Görsel — kırpılmadan kendi oranında; dikey afişte yan boşluklar aynı görselin bulanık hâliyle dolar */}
      {popup.imageUrl && (
        <div className="relative w-full overflow-hidden bg-gray-100">
          <img
            src={popup.imageUrl}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60"
          />
          <img
            src={popup.imageUrl}
            alt={popup.title}
            className="relative block w-full h-auto max-h-[60vh] object-contain"
          />
        </div>
      )}

      {/* İçerik */}
      <div className="px-6 pt-5 pb-6 text-center">
        <MenuModalTitle>{popup.title}</MenuModalTitle>

        {/* İçerik metni */}
        <p
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: "#5a5a5a" }}
        >
          {popup.content}
        </p>

        {/* Link butonu (ör. turnuva kaydı): tıklanınca popup görüldü sayılır ve linke gidilir */}
        {popup.buttonUrl && (
          <a
            href={popup.buttonUrl}
            onClick={onClose}
            className="mt-6 block w-full py-2.5 rounded-xl font-semibold text-white text-sm tracking-wide transition-all active:scale-95"
            style={primaryButtonStyle}
          >
            {popup.buttonText || "Detaylar"}
          </a>
        )}

        {/* Tamam butonu; link butonu varsa ikincil "Kapat" olarak görünür */}
        {popup.buttonUrl ? (
          <button
            onClick={onClose}
            className="mt-3 w-full py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Kapat
          </button>
        ) : (
          <button
            onClick={onClose}
            className="mt-6 w-full py-2.5 rounded-xl font-semibold text-white text-sm tracking-wide transition-all active:scale-95"
            style={primaryButtonStyle}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
            }
          >
            Tamam
          </button>
        )}
      </div>
    </MenuModal>
  );
};

export default CustomerPopupModal;

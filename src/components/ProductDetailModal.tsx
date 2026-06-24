import { useEffect, useState } from "react";
import { IMenuItem, ICategory } from "../common/types";
import { NO_IMAGE_URL } from "../utils/constants";

interface IProps {
  product: IMenuItem;
  categories: ICategory[];
  onClose: () => void;
}

const ANIM_DURATION = 320;

const ProductDetailModal = ({ product, categories, onClose }: IProps) => {
  const { name, category, price, referencePrice, description, imageUrl } = product;
  const foundCategory = categories.find((cat) => cat._id === category);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, ANIM_DURATION);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end md:items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        animation: closing
          ? `fadeOut ${ANIM_DURATION}ms ease both`
          : "fadeIn 0.25s ease both",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl"
        style={{
          animation: closing
            ? `slideDown ${ANIM_DURATION}ms cubic-bezier(0.32, 0, 0.67, 0) both`
            : "slideUp 0.38s cubic-bezier(0.22, 1, 0.36, 1) both",
          boxShadow: "0 -4px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Görsel */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={imageUrl && imageUrl !== "" ? imageUrl : NO_IMAGE_URL}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

          {/* Kapat butonu */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 transition-all text-base leading-none backdrop-blur-sm border border-gray-200 shadow-sm"
            aria-label="Kapat"
          >
            ✕
          </button>

          {/* Kategori etiketi */}
          {foundCategory && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/80 text-amber-700 border border-amber-200 backdrop-blur-sm shadow-sm">
              {foundCategory.name}
            </span>
          )}
        </div>

        {/* İçerik */}
        <div className="px-6 pt-4 pb-8 max-md:pb-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-gray-900 font-bold text-xl leading-snug flex-1">
              {name}
            </h2>

            <div className="flex flex-col items-end shrink-0">
              {!!referencePrice && referencePrice > 0 && (
                <span className="relative text-gray-400 text-sm font-medium px-1 leading-none mb-1">
                  ₺ {referencePrice}
                  <span
                    className="absolute inset-x-0 border-gray-400"
                    style={{ borderTopWidth: "1.5px", top: "50%", transform: "translateY(-50%)" }}
                  />
                </span>
              )}
              <span className="text-amber-600 font-bold text-2xl leading-none">
                ₺ {price}
              </span>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-amber-400/50 via-amber-200/30 to-transparent mb-4" />

          {description && description !== "-" ? (
            <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
              {description}
            </p>
          ) : (
            <p className="text-gray-300 text-sm italic">Açıklama bulunmuyor.</p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(0); }
          to   { transform: translateY(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailModal;

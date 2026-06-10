import { useRef, useState } from "react";
import { IMenuItem, ICategory } from "../common/types";
import { NO_IMAGE_URL } from "../utils/constants";

interface IProps {
  product: IMenuItem;
  param: number;
  categories: ICategory[];
  onClick?: () => void;
}

const DESC_LIMIT = 90;

function dummyLikes(id: number): string {
  const n = 800 + (id * 37 + 421) % 13800;
  if (n >= 1000) {
    const formatted = (n / 1000).toFixed(1).replace(".", ",");
    return formatted.endsWith(",0") ? formatted.slice(0, -2) + " B" : formatted + " B";
  }
  return String(n);
}

function dummySmall(id: number, seed: number): number {
  return 10 + (id * seed + 113) % 990;
}

const ProductCard = ({ product, categories, onClick }: IProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [heartPos, setHeartPos] = useState({ x: 50, y: 50 });
  const lastTapRef = useRef<number>(0);

  const handleImageTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      const rect = e.currentTarget.getBoundingClientRect();
      setHeartPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
      setLiked(true);
      setHeartAnim(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setHeartAnim(true)));
      setTimeout(() => setHeartAnim(false), 800);
    }
    lastTapRef.current = now;
  };

  const { name, category, price, referencePrice, description, imageUrl } = product;
  const foundCategory = categories.find((cat) => cat._id === category);
  const hasDesc = description && description !== "-";
  const isTruncated = hasDesc && description.length > DESC_LIMIT;

  return (
    <div className="bg-white border-b border-gray-200">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <img
            src={foundCategory?.imageUrl || NO_IMAGE_URL}
            alt={foundCategory?.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 border-2 border-gray-200"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 leading-tight">
              {name}
            </span>
            <span className="text-xs text-gray-500 leading-tight">
              {foundCategory?.name}
            </span>
          </div>
        </div>

        <button className="p-1 text-gray-700" aria-label="Seçenekler">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="19" cy="12" r="1.8" />
          </svg>
        </button>
      </div>

      {/* ── Image ── */}
      <div
        className="relative w-full aspect-square cursor-pointer select-none"
        onClick={handleImageTap}
      >
        <img
          src={imageUrl && imageUrl !== "" ? imageUrl : NO_IMAGE_URL}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* double-tap heart animation */}
        {heartAnim && (
          <svg
            style={{ animation: "insta-heart 0.8s ease-out forwards", position: "absolute", top: `${heartPos.y}%`, left: `${heartPos.x}%`, transform: "translate(-50%,-50%)", pointerEvents: "none" }}
            width="100" height="100" viewBox="0 0 24 24"
            filter="drop-shadow(0 2px 8px rgba(0,0,0,0.35))"
          >
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <path fill="url(#heartGrad)" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}

        {/* price overlay */}
        <div className="absolute bottom-0 right-0 p-3 pointer-events-none">
          <div className="flex flex-col items-end">
            {!!referencePrice && referencePrice > 0 && (
              <span className="relative text-white/60 text-sm font-medium px-0.5 leading-none mb-1">
                ₺{referencePrice}
                <span
                  className="absolute inset-x-0 border-white/60"
                  style={{ borderTopWidth: "1px", top: "50%", transform: "translateY(-50%)" }}
                />
              </span>
            )}
            <span className="text-amber-400 font-bold text-2xl drop-shadow-md leading-none">
              ₺{price}
            </span>
          </div>
        </div>
      </div>

      {/* ── Action bar ── */}
      <div className="flex items-center px-3 pt-2.5 pb-1">
        <div className="flex items-center gap-4 flex-1">
          {/* Like */}
          <button
            onClick={() => setLiked((v) => !v)}
            className="flex items-center gap-1.5 active:scale-110 transition-transform duration-100"
            aria-label="Beğen"
          >
            <svg
              width="26" height="26" viewBox="0 0 24 24"
              fill={liked ? "#ef4444" : "none"}
              stroke={liked ? "#ef4444" : "#262626"}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{dummyLikes(product._id)}</span>
          </button>

          {/* Comment */}
          <button className="flex items-center gap-1.5 active:scale-110 transition-transform duration-100" aria-label="Yorum">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{transform:"scaleX(-1)"}}>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{dummySmall(product._id, 53)}</span>
          </button>

          {/* Share / Send */}
          <button className="flex items-center gap-1.5 active:scale-110 transition-transform duration-100" aria-label="Paylaş">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{dummySmall(product._id, 79)}</span>
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => setSaved((v) => !v)}
          className="active:scale-110 transition-transform duration-100"
          aria-label="Kaydet"
        >
          <svg
            width="26" height="26" viewBox="0 0 24 24"
            fill={saved ? "#262626" : "none"}
            stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* ── Caption ── */}
      {hasDesc && (
        <div className="px-3 pb-4">
          <p className="text-sm text-gray-900 leading-snug">
            <span className="font-semibold mr-1">{name}</span>
            {expanded || !isTruncated
              ? description
              : description.slice(0, DESC_LIMIT) + "..."}
            {isTruncated && !expanded && (
              <>
                {" "}
                <button
                  onClick={() => setExpanded(true)}
                  className="text-gray-500 text-sm font-normal"
                >
                  devamını gör
                </button>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

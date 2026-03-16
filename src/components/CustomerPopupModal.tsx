import React from "react";
import { ICustomerPopup } from "../common/apis";

interface Props {
  popup: ICustomerPopup;
  onClose: () => void;
}

const CustomerPopupModal: React.FC<Props> = ({ popup, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl leading-none z-10"
          aria-label="Kapat"
        >
          &times;
        </button>

        {/* Image */}
        {popup.imageUrl && (
          <img
            src={popup.imageUrl}
            alt={popup.title}
            className="w-full object-cover max-h-52"
          />
        )}

        {/* Content */}
        <div className="p-5 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {popup.title}
          </h2>
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {popup.content}
          </p>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2 rounded-xl bg-orange-400 hover:bg-orange-300 text-white font-semibold transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPopupModal;
